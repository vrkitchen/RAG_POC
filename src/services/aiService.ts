
import { getSalesData, getSalesAnalytics, getCurrentMonthSales, getTopProductsThisMonth, getPreviousMonthSales } from './salesService';
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  charts?: any[];
  tables?: any[];
}

export const processQuery = async (query: string, userRole: 'manager' | 'rep'): Promise<ChatMessage> => {
  try {
    console.log('Processing query:', query, 'for role:', userRole);
    
    // Always fetch fresh data from database
    console.log('Fetching fresh data from database...');
    const [salesData, analytics, currentMonthSales, previousMonthSales, topProducts] = await Promise.all([
      getSalesData(),
      getSalesAnalytics(),
      getCurrentMonthSales(),
      getPreviousMonthSales(),
      getTopProductsThisMonth(10)
    ]);
    
    console.log('Fresh data fetched:', {
      salesRecords: salesData.length,
      totalRevenue: analytics.totalRevenue,
      currentMonthSales: currentMonthSales.totalSales,
      previousMonthSales: previousMonthSales.totalSales,
      topProducts: topProducts.length
    });

    // Build comprehensive data summary from actual database
    const dataSummary = {
      totalRevenue: analytics.totalRevenue,
      totalTransactions: analytics.totalTransactions,
      currentMonthSales: currentMonthSales.totalSales,
      currentMonthTransactions: currentMonthSales.transactionCount,
      currentMonth: currentMonthSales.month,
      previousMonthSales: previousMonthSales.totalSales,
      previousMonthTransactions: previousMonthSales.transactionCount,
      previousMonth: previousMonthSales.month,
      monthOverMonthGrowth: previousMonthSales.totalSales > 0 
        ? ((currentMonthSales.totalSales - previousMonthSales.totalSales) / previousMonthSales.totalSales) * 100 
        : 0,
      topProducts: analytics.productPerformance.slice(0, 10),
      topProductsThisMonth: topProducts,
      topStores: analytics.storePerformance.slice(0, 10),
      averageTransactionValue: analytics.totalTransactions > 0 ? analytics.totalRevenue / analytics.totalTransactions : 0,
      averageMonthlyTransactionValue: currentMonthSales.transactionCount > 0 ? currentMonthSales.totalSales / currentMonthSales.transactionCount : 0,
      ...(userRole === 'manager' && { topCashiers: analytics.topCashiers.slice(0, 10) })
    };

    console.log('Data summary for AI:', dataSummary);

    // Call edge function with real database data
    const { data: result, error } = await supabase.functions.invoke('chat', {
      body: {
        query,
        userRole,
        dataSummary,
        salesData: salesData.slice(0, 100)
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(`Failed to process query: ${error.message}`);
    }

    console.log('AI response received:', result);
    
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: result.response || 'I apologize, but I could not process your request.',
      timestamp: new Date(),
      charts: result.charts || [],
      tables: result.tables || []
    };
  } catch (error) {
    console.error('Error processing query:', error);
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I apologize, but I encountered an error processing your request: ${error instanceof Error ? error.message : 'Unknown error'}. Please check the database connection and try again.`,
      timestamp: new Date()
    };
  }
};

export const getPredefinedQueries = (userRole: 'manager' | 'rep') => {
  const commonQueries = [
    "What were our total sales in March 2024?",
    "Show me the top 5 selling products from our database",
    "Which store (Store A, B, C, or D) performed best?",
    "What's our average transaction value?",
    "Show me sales by payment type (Credit Card, Cash, Gift Card)",
    "What are the most popular products sold?",
    "Compare weekend vs weekday sales performance",
    "Show me sales by time of day (Morning, Afternoon, Evening)",
    "Which products have the highest unit prices?",
    "What's the total quantity of items sold?"
  ];

  const managerQueries = [
    "Who are the top performing cashiers (C1, C2, C3, C4, C5)?",
    "Compare cashier performance across all stores",
    "Which store managers (Noah, Emma, Liam, Olivia) have the highest sales?",
    "Show me individual cashier sales breakdown",
    "Which cashiers work in which stores?"
  ];

  return userRole === 'manager' ? [...commonQueries, ...managerQueries] : commonQueries;
};
