
-- Drop and recreate the sales_transactions table with the exact CSV structure
DROP TABLE IF EXISTS public.sales_transactions;

CREATE TABLE public.sales_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time TIME WITHOUT TIME ZONE NOT NULL,
  store_id TEXT NOT NULL,
  location TEXT NOT NULL,
  product TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC NOT NULL,
  payment_type TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  cashier TEXT NOT NULL,
  store_manager TEXT NOT NULL,
  time_of_day TEXT NOT NULL,
  day_of_week TEXT NOT NULL,
  total_price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.sales_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow authenticated users to view sales data" 
  ON public.sales_transactions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to insert sales data" 
  ON public.sales_transactions 
  FOR INSERT 
  WITH CHECK (true);

-- Create index for better performance on date queries
CREATE INDEX idx_sales_transactions_date ON public.sales_transactions(date);
CREATE INDEX idx_sales_transactions_store_id ON public.sales_transactions(store_id);
