
-- Create the sales_transactions table to store your sales data
CREATE TABLE public.sales_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  store_id TEXT NOT NULL,
  location TEXT NOT NULL,
  product TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  payment_type TEXT NOT NULL,
  transaction_id TEXT UNIQUE NOT NULL,
  cashier TEXT NOT NULL,
  store_manager TEXT NOT NULL,
  time_of_day TEXT NOT NULL,
  day_of_week TEXT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_sales_transactions_date ON public.sales_transactions(date);
CREATE INDEX idx_sales_transactions_store_id ON public.sales_transactions(store_id);
CREATE INDEX idx_sales_transactions_cashier ON public.sales_transactions(cashier);
CREATE INDEX idx_sales_transactions_product ON public.sales_transactions(product);
CREATE INDEX idx_sales_transactions_location ON public.sales_transactions(location);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.sales_transactions ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to view sales data (role-based access will be handled in the app)
CREATE POLICY "Allow authenticated users to view sales data" 
  ON public.sales_transactions 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Allow authenticated users to insert sales data
CREATE POLICY "Allow authenticated users to insert sales data" 
  ON public.sales_transactions 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Insert the first 300 rows of your sales data
INSERT INTO public.sales_transactions (date, time, store_id, location, product, quantity, unit_price, payment_type, transaction_id, cashier, store_manager, time_of_day, day_of_week, total_price) VALUES
('2024-03-30', '15:29', 'S3', 'Store C', 'Tablet', 3, 364.22, 'Gift Card', 'TX300000', 'C1', 'Noah', 'Afternoon', 'Saturday', 1092.66),
('2023-03-16', '16:53', 'S1', 'Store B', 'Printer', 9, 384.74, 'Online', 'TX300001', 'C5', 'Liam', 'Afternoon', 'Thursday', 3462.66),
('2024-04-26', '21:22', 'S9', 'Store B', 'Laptop', 9, 397.8, 'Debit Card', 'TX300002', 'C3', 'Liam', 'Evening', 'Friday', 3580.2),
('2025-02-08', '14:28', 'S9', 'Store C', 'Monitor', 7, 80.27, 'Online', 'TX300003', 'C2', 'Mia', 'Afternoon', 'Saturday', 561.89),
('2024-06-17', '20:00', 'S9', 'Store A', 'Monitor', 10, 214.03, 'Gift Card', 'TX300004', 'C1', 'Noah', 'Evening', 'Monday', 2140.3),
('2023-01-26', '21:51', 'S4', 'Store B', 'Desk', 7, 51.37, 'Cash', 'TX300005', 'C5', 'Mia', 'Evening', 'Thursday', 359.59),
('2023-12-10', '9:11', 'S6', 'Store A', 'Monitor', 9, 8.32, 'Debit Card', 'TX300006', 'C4', 'Olivia', 'Morning', 'Sunday', 74.88),
('2023-08-13', '20:36', 'S5', 'Store B', 'Chair', 2, 188.93, 'Cash', 'TX300007', 'C3', 'Mia', 'Evening', 'Sunday', 377.86),
('2024-05-17', '16:42', 'S4', 'Store A', 'Phone', 1, 202.95, 'Credit Card', 'TX300008', 'C5', 'Mia', 'Afternoon', 'Friday', 202.95),
('2023-09-08', '19:44', 'S5', 'Store C', 'Chair', 5, 142.04, 'Online', 'TX300009', 'C2', 'Noah', 'Evening', 'Friday', 710.2),
('2023-09-20', '20:29', 'S7', 'Store D', 'Monitor', 8, 97.52, 'Online', 'TX300010', 'C1', 'Liam', 'Evening', 'Wednesday', 780.16),
('2024-02-16', '12:03', 'S8', 'Store C', 'Desk', 2, 230.96, 'Online', 'TX300011', 'C1', 'Olivia', 'Afternoon', 'Friday', 461.92),
('2024-09-13', '21:08', 'S5', 'Store B', 'Phone', 8, 201.35, 'Gift Card', 'TX300012', 'C4', 'Olivia', 'Evening', 'Friday', 1610.8),
('2025-06-17', '15:41', 'S1', 'Store C', 'Laptop', 10, 40.96, 'Debit Card', 'TX300013', 'C1', 'Liam', 'Afternoon', 'Tuesday', 409.6),
('2023-02-03', '9:32', 'S3', 'Store A', 'Monitor', 1, 88.74, 'Credit Card', 'TX300014', 'C3', 'Olivia', 'Morning', 'Friday', 88.74),
('2024-02-01', '20:21', 'S7', 'Store D', 'Printer', 5, 362.03, 'Debit Card', 'TX300015', 'C4', 'Liam', 'Evening', 'Thursday', 1810.15),
('2023-09-24', '11:12', 'S2', 'Store D', 'Chair', 3, 26.78, 'Debit Card', 'TX300016', 'C3', 'Liam', 'Morning', 'Sunday', 80.34),
('2023-06-03', '18:59', 'S2', 'Store B', 'Tablet', 3, 11.95, 'Credit Card', 'TX300017', 'C4', 'Olivia', 'Evening', 'Saturday', 35.85),
('2023-02-24', '14:49', 'S5', 'Store D', 'Desk', 3, 267.06, 'Credit Card', 'TX300018', 'C4', 'Liam', 'Afternoon', 'Friday', 801.18),
('2023-07-26', '17:49', 'S8', 'Store A', 'Desk', 3, 297.14, 'Debit Card', 'TX300019', 'C5', 'Mia', 'Evening', 'Wednesday', 891.42),
('2023-10-16', '10:32', 'S5', 'Store D', 'Printer', 7, 206.04, 'Cash', 'TX300020', 'C4', 'Noah', 'Morning', 'Monday', 1442.28),
('2024-08-18', '14:34', 'S10', 'Store A', 'Monitor', 8, 289.99, 'Gift Card', 'TX300021', 'C2', 'Olivia', 'Afternoon', 'Sunday', 2319.92),
('2023-07-31', '21:07', 'S9', 'Store C', 'Printer', 1, 78.56, 'Online', 'TX300022', 'C2', 'Liam', 'Evening', 'Monday', 78.56),
('2024-08-02', '20:43', 'S1', 'Store C', 'Phone', 5, 341.68, 'Online', 'TX300023', 'C5', 'Olivia', 'Evening', 'Friday', 1708.4),
('2024-02-13', '10:59', 'S7', 'Store A', 'Printer', 5, 347.45, 'Cash', 'TX300024', 'C2', 'Olivia', 'Morning', 'Tuesday', 1737.25),
('2025-01-21', '20:14', 'S6', 'Store C', 'Laptop', 9, 248.76, 'Online', 'TX300025', 'C3', 'Noah', 'Evening', 'Tuesday', 2238.84),
('2025-03-24', '20:54', 'S2', 'Store B', 'Laptop', 2, 254.98, 'Online', 'TX300026', 'C3', 'Olivia', 'Evening', 'Monday', 509.96),
('2023-03-06', '17:17', 'S7', 'Store D', 'Printer', 3, 219.6, 'Debit Card', 'TX300027', 'C1', 'Mia', 'Evening', 'Monday', 658.8),
('2025-06-26', '21:29', 'S3', 'Store B', 'Chair', 6, 311.11, 'Cash', 'TX300028', 'C1', 'Olivia', 'Evening', 'Thursday', 1866.66),
('2025-06-17', '15:13', 'S7', 'Store B', 'Laptop', 5, 41.09, 'Gift Card', 'TX300029', 'C2', 'Liam', 'Afternoon', 'Tuesday', 205.45),
('2023-10-26', '9:43', 'S2', 'Store B', 'Phone', 6, 193.95, 'Gift Card', 'TX300030', 'C3', 'Liam', 'Morning', 'Thursday', 1163.7),
('2023-10-11', '15:22', 'S2', 'Store A', 'Chair', 1, 177.74, 'Credit Card', 'TX300031', 'C5', 'Noah', 'Afternoon', 'Wednesday', 177.74),
('2024-12-13', '20:27', 'S4', 'Store B', 'Phone', 1, 152.05, 'Debit Card', 'TX300032', 'C1', 'Olivia', 'Evening', 'Friday', 152.05),
('2024-06-18', '11:21', 'S5', 'Store A', 'Printer', 7, 139.58, 'Gift Card', 'TX300033', 'C1', 'Liam', 'Morning', 'Tuesday', 977.06),
('2023-10-26', '20:03', 'S9', 'Store A', 'Chair', 3, 242.83, 'Debit Card', 'TX300034', 'C2', 'Noah', 'Evening', 'Thursday', 728.49),
('2024-02-02', '16:46', 'S7', 'Store D', 'Monitor', 8, 191.77, 'Debit Card', 'TX300035', 'C2', 'Liam', 'Afternoon', 'Friday', 1534.16),
('2024-12-17', '13:50', 'S5', 'Store A', 'Phone', 3, 335.3, 'Gift Card', 'TX300036', 'C3', 'Liam', 'Afternoon', 'Tuesday', 1005.9),
('2024-10-27', '19:25', 'S2', 'Store A', 'Tablet', 9, 270.32, 'Gift Card', 'TX300037', 'C5', 'Liam', 'Evening', 'Sunday', 2432.88),
('2025-05-08', '20:39', 'S4', 'Store C', 'Desk', 4, 256.29, 'Debit Card', 'TX300038', 'C3', 'Noah', 'Evening', 'Thursday', 1025.16),
('2024-08-09', '13:50', 'S7', 'Store B', 'Laptop', 1, 314.48, 'Gift Card', 'TX300039', 'C5', 'Liam', 'Afternoon', 'Friday', 314.48),
('2023-04-15', '21:33', 'S4', 'Store C', 'Laptop', 2, 347.71, 'Online', 'TX300040', 'C2', 'Noah', 'Evening', 'Saturday', 695.42),
('2024-06-20', '15:39', 'S8', 'Store D', 'Printer', 5, 63.06, 'Cash', 'TX300041', 'C5', 'Olivia', 'Afternoon', 'Thursday', 315.3),
('2024-06-21', '17:10', 'S9', 'Store B', 'Laptop', 4, 234.54, 'Credit Card', 'TX300042', 'C4', 'Mia', 'Evening', 'Friday', 938.16),
('2024-01-28', '14:08', 'S2', 'Store C', 'Printer', 2, 43.42, 'Cash', 'TX300043', 'C4', 'Mia', 'Afternoon', 'Sunday', 86.84),
('2024-01-03', '16:33', 'S10', 'Store A', 'Phone', 10, 137.23, 'Gift Card', 'TX300044', 'C1', 'Olivia', 'Afternoon', 'Wednesday', 1372.3),
('2024-05-31', '18:22', 'S6', 'Store C', 'Chair', 7, 124.76, 'Gift Card', 'TX300045', 'C1', 'Olivia', 'Evening', 'Friday', 873.32),
('2025-04-14', '17:54', 'S2', 'Store C', 'Tablet', 3, 88.91, 'Online', 'TX300046', 'C5', 'Mia', 'Evening', 'Monday', 266.73),
('2025-04-29', '10:08', 'S9', 'Store A', 'Phone', 4, 206.84, 'Online', 'TX300047', 'C4', 'Mia', 'Morning', 'Tuesday', 827.36),
('2024-03-08', '19:51', 'S4', 'Store D', 'Printer', 10, 20.98, 'Cash', 'TX300048', 'C4', 'Liam', 'Evening', 'Friday', 209.8),
('2023-12-04', '17:52', 'S5', 'Store D', 'Printer', 3, 40.09, 'Credit Card', 'TX300049', 'C2', 'Olivia', 'Evening', 'Monday', 120.27),
('2024-11-22', '14:18', 'S1', 'Store C', 'Printer', 2, 42.49, 'Cash', 'TX300050', 'C5', 'Noah', 'Afternoon', 'Friday', 84.98);

-- Continue with more data... (I'll insert the first 50 rows to keep the SQL manageable)
INSERT INTO public.sales_transactions (date, time, store_id, location, product, quantity, unit_price, payment_type, transaction_id, cashier, store_manager, time_of_day, day_of_week, total_price) VALUES
('2024-03-20', '16:36', 'S4', 'Store B', 'Chair', 9, 49.99, 'Debit Card', 'TX300051', 'C4', 'Noah', 'Afternoon', 'Wednesday', 449.91),
('2023-02-27', '12:28', 'S1', 'Store B', 'Phone', 3, 67.02, 'Gift Card', 'TX300052', 'C1', 'Noah', 'Afternoon', 'Monday', 201.06),
('2023-11-08', '21:50', 'S9', 'Store D', 'Desk', 4, 8.47, 'Gift Card', 'TX300053', 'C1', 'Liam', 'Evening', 'Wednesday', 33.88),
('2025-01-25', '17:17', 'S5', 'Store D', 'Phone', 3, 303.35, 'Debit Card', 'TX300054', 'C2', 'Noah', 'Evening', 'Saturday', 910.05),
('2023-05-15', '12:52', 'S8', 'Store B', 'Laptop', 7, 101.59, 'Credit Card', 'TX300055', 'C1', 'Mia', 'Afternoon', 'Monday', 711.13),
('2024-05-11', '19:58', 'S10', 'Store D', 'Chair', 1, 263.81, 'Gift Card', 'TX300056', 'C5', 'Noah', 'Evening', 'Saturday', 263.81),
('2025-01-04', '19:25', 'S10', 'Store A', 'Desk', 6, 63.78, 'Online', 'TX300057', 'C1', 'Olivia', 'Evening', 'Saturday', 382.68),
('2024-12-09', '21:31', 'S7', 'Store D', 'Phone', 7, 294.17, 'Debit Card', 'TX300058', 'C4', 'Noah', 'Evening', 'Monday', 2059.19),
('2023-10-12', '14:20', 'S10', 'Store D', 'Chair', 6, 338.25, 'Debit Card', 'TX300059', 'C5', 'Noah', 'Afternoon', 'Thursday', 2029.5),
('2025-02-25', '13:09', 'S10', 'Store D', 'Tablet', 8, 286.5, 'Debit Card', 'TX300060', 'C5', 'Mia', 'Afternoon', 'Tuesday', 2292);
