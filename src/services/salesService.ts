
import { supabase } from "@/integrations/supabase/client";

export interface SalesRecord {
  id: string;
  date: string;
  time: string;
  store_id: string;
  location: string;
  product: string;
  quantity: number;
  unit_price: number;
  payment_type: string;
  transaction_id: string;
  cashier: string;
  store_manager: string;
  time_of_day: string;
  day_of_week: string;
  total_price: number;
  created_at: string;
  updated_at: string;
}

export const getSalesData = async (): Promise<SalesRecord[]> => {
  console.log('Fetching sales data from database...');
  
  try {
    const { data, error } = await supabase
      .from('sales_transactions')
      .select('*')
      .order('date', { ascending: false })
      .limit(1000);

    if (error) {
      console.error('Error fetching sales data:', error);
      throw new Error(`Failed to fetch sales data: ${error.message}`);
    }

    console.log('Sales data fetched successfully:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export const getSalesAnalytics = async () => {
  console.log('Calculating sales analytics...');
  
  try {
    const salesData = await getSalesData();

    if (!salesData || salesData.length === 0) {
      console.warn('No sales data available for analytics');
      return {
        topCashiers: [],
        productPerformance: [],
        storePerformance: [],
        totalRevenue: 0,
        totalTransactions: 0
      };
    }

    // Top performers by cashier
    const cashierPerformance = salesData.reduce((acc, record) => {
      if (!acc[record.cashier]) {
        acc[record.cashier] = 0;
      }
      acc[record.cashier] += Number(record.total_price);
      return acc;
    }, {} as Record<string, number>);

    const topCashiers = Object.entries(cashierPerformance)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    // Product performance
    const productPerformance = salesData.reduce((acc, record) => {
      if (!acc[record.product]) {
        acc[record.product] = 0;
      }
      acc[record.product] += Number(record.total_price);
      return acc;
    }, {} as Record<string, number>);

    const productData = Object.entries(productPerformance)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Store performance
    const storePerformance = salesData.reduce((acc, record) => {
      if (!acc[record.location]) {
        acc[record.location] = 0;
      }
      acc[record.location] += Number(record.total_price);
      return acc;
    }, {} as Record<string, number>);

    const storeData = Object.entries(storePerformance)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const totalRevenue = salesData.reduce((sum, record) => sum + Number(record.total_price), 0);
    const totalTransactions = salesData.length;

    console.log('Analytics calculated:', {
      totalRevenue,
      totalTransactions,
      topCashiers: topCashiers.length,
      products: productData.length,
      stores: storeData.length
    });

    return {
      topCashiers,
      productPerformance: productData,
      storePerformance: storeData,
      totalRevenue,
      totalTransactions
    };
  } catch (error) {
    console.error('Error calculating analytics:', error);
    throw error;
  }
};

export const getCurrentMonthSales = async () => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const startDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
    
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    const endDate = `${nextYear}-${nextMonth.toString().padStart(2, '0')}-01`;
    
    console.log('Fetching current month sales from', startDate, 'to', endDate);
    
    const { data, error } = await supabase
      .from('sales_transactions')
      .select('total_price')
      .gte('date', startDate)
      .lt('date', endDate);

    if (error) {
      console.error('Error fetching current month sales:', error);
      throw error;
    }

    const totalSales = data?.reduce((sum, record) => sum + Number(record.total_price), 0) || 0;
    const transactionCount = data?.length || 0;

    console.log('Current month sales:', { totalSales, transactionCount });

    return {
      totalSales,
      transactionCount,
      month: `${currentYear}-${currentMonth.toString().padStart(2, '0')}`
    };
  } catch (error) {
    console.error('Error fetching current month sales:', error);
    return { 
      totalSales: 0, 
      transactionCount: 0, 
      month: new Date().toISOString().substring(0, 7) 
    };
  }
};

export const getPreviousMonthSales = async () => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    
    const startDate = `${prevYear}-${prevMonth.toString().padStart(2, '0')}-01`;
    const endDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
    
    console.log('Fetching previous month sales from', startDate, 'to', endDate);
    
    const { data, error } = await supabase
      .from('sales_transactions')
      .select('total_price')
      .gte('date', startDate)
      .lt('date', endDate);

    if (error) {
      console.error('Error fetching previous month sales:', error);
      throw error;
    }

    const totalSales = data?.reduce((sum, record) => sum + Number(record.total_price), 0) || 0;
    const transactionCount = data?.length || 0;

    console.log('Previous month sales:', { totalSales, transactionCount });

    return {
      totalSales,
      transactionCount,
      month: `${prevYear}-${prevMonth.toString().padStart(2, '0')}`
    };
  } catch (error) {
    console.error('Error fetching previous month sales:', error);
    return { 
      totalSales: 0, 
      transactionCount: 0, 
      month: 'unknown' 
    };
  }
};

export const getTopProductsThisMonth = async (limit = 5) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const startDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
    
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    const endDate = `${nextYear}-${nextMonth.toString().padStart(2, '0')}-01`;
    
    const { data, error } = await supabase
      .from('sales_transactions')
      .select('product, total_price, quantity')
      .gte('date', startDate)
      .lt('date', endDate);

    if (error) throw error;

    const productSales = data?.reduce((acc, record) => {
      if (!acc[record.product]) {
        acc[record.product] = { revenue: 0, quantity: 0 };
      }
      acc[record.product].revenue += Number(record.total_price);
      acc[record.product].quantity += Number(record.quantity);
      return acc;
    }, {} as Record<string, { revenue: number; quantity: number }>) || {};

    return Object.entries(productSales)
      .map(([name, data]) => ({ 
        name, 
        value: data.revenue,
        quantity: data.quantity 
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching top products:', error);
    return [];
  }
};

export const generateChartData = async (type: 'revenue' | 'trends') => {
  try {
    const salesData = await getSalesData();

    if (type === 'revenue') {
      const monthlyData = salesData.reduce((acc, record) => {
        const month = record.date.substring(0, 7);
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += Number(record.total_price);
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(monthlyData)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(-12);
    }

    return [];
  } catch (error) {
    console.error('Error generating chart data:', error);
    return [];
  }
};
