
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query, userRole, dataSummary, salesData } = await req.json()

    console.log('Received query:', query)
    console.log('User role:', userRole)
    console.log('Data summary:', JSON.stringify(dataSummary, null, 2))

    if (!GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured')
    }

    // Build context from actual live database data only
    const buildDataContext = () => {
      const context = [];
      
      context.push(`LIVE DATABASE ANALYSIS (sales_transactions table):`);
      
      if (dataSummary.totalRevenue !== undefined && dataSummary.totalTransactions !== undefined) {
        context.push(`Total Revenue (All Time): ₹${dataSummary.totalRevenue.toLocaleString('en-IN')}`);
        context.push(`Total Transactions (All Time): ${dataSummary.totalTransactions}`);
      } else {
        context.push(`Total Revenue: ₹0 (No data in database)`);
        context.push(`Total Transactions: 0 (No data in database)`);
      }
      
      if (dataSummary.currentMonthSales !== undefined) {
        context.push(`Current Month (${dataSummary.currentMonth}): ₹${dataSummary.currentMonthSales.toLocaleString('en-IN')} from ${dataSummary.currentMonthTransactions} transactions`);
      } else {
        context.push(`Current Month: ₹0 (No current month data)`);
      }
      
      if (dataSummary.previousMonthSales !== undefined) {
        context.push(`Previous Month (${dataSummary.previousMonth}): ₹${dataSummary.previousMonthSales.toLocaleString('en-IN')} from ${dataSummary.previousMonthTransactions} transactions`);
        
        if (dataSummary.monthOverMonthGrowth !== undefined) {
          const growthDirection = dataSummary.monthOverMonthGrowth >= 0 ? 'increase' : 'decrease';
          context.push(`Month-over-Month Growth: ${dataSummary.monthOverMonthGrowth.toFixed(1)}% ${growthDirection}`);
        }
      } else {
        context.push(`Previous Month: ₹0 (No previous month data)`);
      }
      
      if (dataSummary.averageTransactionValue) {
        context.push(`Average Transaction Value: ₹${dataSummary.averageTransactionValue.toFixed(2)}`);
      }

      if (dataSummary.topProducts && dataSummary.topProducts.length > 0) {
        context.push(`\nTOP PRODUCTS (All Time from database):`);
        dataSummary.topProducts.slice(0, 5).forEach((product, i) => {
          context.push(`${i + 1}. ${product.name}: ₹${product.value.toLocaleString('en-IN')}`);
        });
      } else {
        context.push(`\nTOP PRODUCTS: No product data in database`);
      }

      if (dataSummary.topProductsThisMonth && dataSummary.topProductsThisMonth.length > 0) {
        context.push(`\nTOP PRODUCTS THIS MONTH (from database):`);
        dataSummary.topProductsThisMonth.slice(0, 5).forEach((product, i) => {
          context.push(`${i + 1}. ${product.name}: ₹${product.value.toLocaleString('en-IN')}`);
        });
      } else {
        context.push(`\nTOP PRODUCTS THIS MONTH: No current month product data`);
      }

      if (dataSummary.topStores && dataSummary.topStores.length > 0) {
        context.push(`\nTOP STORES (from database):`);
        dataSummary.topStores.slice(0, 5).forEach((store, i) => {
          context.push(`${i + 1}. ${store.name}: ₹${store.value.toLocaleString('en-IN')}`);
        });
      } else {
        context.push(`\nTOP STORES: No store data in database`);
      }

      if (userRole === 'manager' && dataSummary.topCashiers && dataSummary.topCashiers.length > 0) {
        context.push(`\nTOP CASHIERS (Manager Access - from database):`);
        dataSummary.topCashiers.slice(0, 5).forEach((cashier, i) => {
          context.push(`${i + 1}. ${cashier.name}: ₹${cashier.value.toLocaleString('en-IN')}`);
        });
      } else if (userRole === 'manager') {
        context.push(`\nTOP CASHIERS: No cashier data in database`);
      }

      return context.join('\n');
    };

    const systemPrompt = `You are a sales analytics AI assistant with direct access to a live sales database (sales_transactions table).

CRITICAL: You must ONLY use the actual data provided below. Do not make up numbers or use hypothetical data.

User Role: ${userRole.toUpperCase()}
${userRole === 'manager' ? 'FULL ACCESS: You can access all data including individual cashier performance.' : 'LIMITED ACCESS: You can access general sales data but NOT individual cashier performance.'}

${buildDataContext()}

SAMPLE RECENT TRANSACTIONS FROM DATABASE:
${salesData?.slice(0, 3).map(t => `- ${t.date} ${t.time}: ${t.product} - ₹${t.total_price} (${t.location}, Cashier: ${t.cashier})`).join('\n') || 'No transactions found in database'}

STRICT INSTRUCTIONS:
1. ONLY use the exact figures from the live database provided above
2. If data shows ₹0 or 0 transactions, clearly state "The database currently contains no data" or "No transactions found"
3. Never invent or estimate numbers - only use what's actually in the database
4. Format currency with commas and ₹ symbol using the exact amounts provided (Indian Rupee format)
5. For role restrictions: ${userRole === 'rep' ? 'DO NOT mention individual cashier names or performance' : 'You can mention cashier performance if data exists'}
6. When comparing periods, use only the actual database figures provided
7. Always clarify that you're analyzing "live database data" 
8. If asked about data that doesn't exist, clearly state what data is missing
9. Base all calculations on the provided dataSummary figures only
10. Use Indian numbering system with commas (e.g., ₹1,00,000 instead of ₹100,000)

Remember: Every number you mention must come directly from the database figures provided above. Never estimate or assume.`;

    console.log('Making request to Groq API...')

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.1,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API error:', errorText)
      throw new Error(`Groq API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || 'I apologize, but I could not process your request.'

    console.log('AI Response:', aiResponse)

    // Generate charts/tables only if database has data
    let charts = []
    let tables = []

    const queryLower = query.toLowerCase();

    if (queryLower.includes('chart') || queryLower.includes('graph') || queryLower.includes('show') || queryLower.includes('compare')) {
      if (queryLower.includes('product') && dataSummary.topProducts?.length > 0) {
        charts.push({
          type: 'bar',
          data: dataSummary.topProducts.slice(0, 8),
          title: 'Top Products by Revenue (₹)'
        });
      }
      
      if (queryLower.includes('store') && dataSummary.topStores?.length > 0) {
        charts.push({
          type: 'bar',
          data: dataSummary.topStores.slice(0, 5),
          title: 'Store Performance (₹)'
        });
      }
      
      if (queryLower.includes('cashier') && userRole === 'manager' && dataSummary.topCashiers?.length > 0) {
        charts.push({
          type: 'bar',
          data: dataSummary.topCashiers.slice(0, 8),
          title: 'Top Cashiers by Revenue (₹)'
        });
      }

      if (queryLower.includes('month') && (queryLower.includes('compare') || queryLower.includes('vs')) && 
          dataSummary.currentMonthSales !== undefined && dataSummary.previousMonthSales !== undefined) {
        charts.push({
          type: 'bar',
          data: [
            { name: `Previous Month (${dataSummary.previousMonth})`, value: dataSummary.previousMonthSales },
            { name: `Current Month (${dataSummary.currentMonth})`, value: dataSummary.currentMonthSales }
          ],
          title: 'Monthly Sales Comparison (₹)'
        });
      }
    }

    if (queryLower.includes('table') || queryLower.includes('list') || queryLower.includes('top')) {
      if (queryLower.includes('cashier') && userRole === 'manager' && dataSummary.topCashiers?.length > 0) {
        tables.push({
          headers: ['Rank', 'Cashier', 'Revenue (₹)'],
          rows: dataSummary.topCashiers.slice(0, 10).map((c, i) => [
            (i + 1).toString(), 
            c.name, 
            `₹${c.value.toLocaleString('en-IN')}`
          ])
        });
      }
      
      if (queryLower.includes('product') && dataSummary.topProducts?.length > 0) {
        tables.push({
          headers: ['Rank', 'Product', 'Revenue (₹)'],
          rows: dataSummary.topProducts.slice(0, 10).map((p, i) => [
            (i + 1).toString(), 
            p.name, 
            `₹${p.value.toLocaleString('en-IN')}`
          ])
        });
      }
      
      if (queryLower.includes('store') && dataSummary.topStores?.length > 0) {
        tables.push({
          headers: ['Rank', 'Store', 'Revenue (₹)'],
          rows: dataSummary.topStores.slice(0, 5).map((s, i) => [
            (i + 1).toString(), 
            s.name, 
            `₹${s.value.toLocaleString('en-IN')}`
          ])
        });
      }
    }

    return new Response(
      JSON.stringify({
        response: aiResponse,
        charts,
        tables
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in chat function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: `I apologize, but I encountered an error processing your request: ${error.message}. Please ensure the database connection is working and try again.`
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
