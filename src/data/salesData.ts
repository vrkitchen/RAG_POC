
export interface SalesRecord {
  Date: string;
  Time: string;
  StoreID: string;
  Location: string;
  Product: string;
  Quantity: number;
  UnitPrice: number;
  PaymentType: string;
  TransactionID: string;
  Cashier: string;
  StoreManager: string;
  TimeOfDay: string;
  DayOfWeek: string;
  TotalPrice: number;
}

export const sampleSalesData: SalesRecord[] = [
  { Date: "2024-03-30", Time: "15:29", StoreID: "S3", Location: "Store C", Product: "Tablet", Quantity: 3, UnitPrice: 364.22, PaymentType: "Gift Card", TransactionID: "TX300000", Cashier: "C1", StoreManager: "Noah", TimeOfDay: "Afternoon", DayOfWeek: "Saturday", TotalPrice: 1092.66 },
  { Date: "2023-03-16", Time: "16:53", StoreID: "S1", Location: "Store B", Product: "Printer", Quantity: 9, UnitPrice: 384.74, PaymentType: "Online", TransactionID: "TX300001", Cashier: "C5", StoreManager: "Liam", TimeOfDay: "Afternoon", DayOfWeek: "Thursday", TotalPrice: 3462.66 },
  { Date: "2024-04-26", Time: "21:22", StoreID: "S9", Location: "Store B", Product: "Laptop", Quantity: 9, UnitPrice: 397.8, PaymentType: "Debit Card", TransactionID: "TX300002", Cashier: "C3", StoreManager: "Liam", TimeOfDay: "Evening", DayOfWeek: "Friday", TotalPrice: 3580.2 },
  { Date: "2025-02-08", Time: "14:28", StoreID: "S9", Location: "Store C", Product: "Monitor", Quantity: 7, UnitPrice: 80.27, PaymentType: "Online", TransactionID: "TX300003", Cashier: "C2", StoreManager: "Mia", TimeOfDay: "Afternoon", DayOfWeek: "Saturday", TotalPrice: 561.89 },
  { Date: "2024-06-17", Time: "20:00", StoreID: "S9", Location: "Store A", Product: "Monitor", Quantity: 10, UnitPrice: 214.03, PaymentType: "Gift Card", TransactionID: "TX300004", Cashier: "C1", StoreManager: "Noah", TimeOfDay: "Evening", DayOfWeek: "Monday", TotalPrice: 2140.3 },
  { Date: "2023-01-26", Time: "21:51", StoreID: "S4", Location: "Store B", Product: "Desk", Quantity: 7, UnitPrice: 51.37, PaymentType: "Cash", TransactionID: "TX300005", Cashier: "C5", StoreManager: "Mia", TimeOfDay: "Evening", DayOfWeek: "Thursday", TotalPrice: 359.59 },
  { Date: "2023-12-10", Time: "9:11", StoreID: "S6", Location: "Store A", Product: "Monitor", Quantity: 9, UnitPrice: 8.32, PaymentType: "Debit Card", TransactionID: "TX300006", Cashier: "C4", StoreManager: "Olivia", TimeOfDay: "Morning", DayOfWeek: "Sunday", TotalPrice: 74.88 },
  { Date: "2023-08-13", Time: "20:36", StoreID: "S5", Location: "Store B", Product: "Chair", Quantity: 2, UnitPrice: 188.93, PaymentType: "Cash", TransactionID: "TX300007", Cashier: "C3", StoreManager: "Mia", TimeOfDay: "Evening", DayOfWeek: "Sunday", TotalPrice: 377.86 },
  { Date: "2024-05-17", Time: "16:42", StoreID: "S4", Location: "Store A", Product: "Phone", Quantity: 1, UnitPrice: 202.95, PaymentType: "Credit Card", TransactionID: "TX300008", Cashier: "C5", StoreManager: "Mia", TimeOfDay: "Afternoon", DayOfWeek: "Friday", TotalPrice: 202.95 },
  { Date: "2023-09-08", Time: "19:44", StoreID: "S5", Location: "Store C", Product: "Chair", Quantity: 5, UnitPrice: 142.04, PaymentType: "Online", TransactionID: "TX300009", Cashier: "C2", StoreManager: "Noah", TimeOfDay: "Evening", DayOfWeek: "Friday", TotalPrice: 710.2 },
  { Date: "2023-09-20", Time: "20:29", StoreID: "S7", Location: "Store D", Product: "Monitor", Quantity: 8, UnitPrice: 97.52, PaymentType: "Online", TransactionID: "TX300010", Cashier: "C1", StoreManager: "Liam", TimeOfDay: "Evening", DayOfWeek: "Wednesday", TotalPrice: 780.16 },
  { Date: "2024-02-16", Time: "12:03", StoreID: "S8", Location: "Store C", Product: "Desk", Quantity: 2, UnitPrice: 230.96, PaymentType: "Online", TransactionID: "TX300011", Cashier: "C1", StoreManager: "Olivia", TimeOfDay: "Afternoon", DayOfWeek: "Friday", TotalPrice: 461.92 },
  { Date: "2024-09-13", Time: "21:08", StoreID: "S5", Location: "Store B", Product: "Phone", Quantity: 8, UnitPrice: 201.35, PaymentType: "Gift Card", TransactionID: "TX300012", Cashier: "C4", StoreManager: "Olivia", TimeOfDay: "Evening", DayOfWeek: "Friday", TotalPrice: 1610.8 },
  { Date: "2025-06-17", Time: "15:41", StoreID: "S1", Location: "Store C", Product: "Laptop", Quantity: 10, UnitPrice: 40.96, PaymentType: "Debit Card", TransactionID: "TX300013", Cashier: "C1", StoreManager: "Liam", TimeOfDay: "Afternoon", DayOfWeek: "Tuesday", TotalPrice: 409.6 },
  { Date: "2023-02-03", Time: "9:32", StoreID: "S3", Location: "Store A", Product: "Monitor", Quantity: 1, UnitPrice: 88.74, PaymentType: "Credit Card", TransactionID: "TX300014", Cashier: "C3", StoreManager: "Olivia", TimeOfDay: "Morning", DayOfWeek: "Friday", TotalPrice: 88.74 },
  { Date: "2024-02-01", Time: "20:21", StoreID: "S7", Location: "Store D", Product: "Printer", Quantity: 5, UnitPrice: 362.03, PaymentType: "Debit Card", TransactionID: "TX300015", Cashier: "C4", StoreManager: "Liam", TimeOfDay: "Evening", DayOfWeek: "Thursday", TotalPrice: 1810.15 },
  { Date: "2023-09-24", Time: "11:12", StoreID: "S2", Location: "Store D", Product: "Chair", Quantity: 3, UnitPrice: 26.78, PaymentType: "Debit Card", TransactionID: "TX300016", Cashier: "C3", StoreManager: "Liam", TimeOfDay: "Morning", DayOfWeek: "Sunday", TotalPrice: 80.34 },
  { Date: "2023-06-03", Time: "18:59", StoreID: "S2", Location: "Store B", Product: "Tablet", Quantity: 3, UnitPrice: 11.95, PaymentType: "Credit Card", TransactionID: "TX300017", Cashier: "C4", StoreManager: "Olivia", TimeOfDay: "Evening", DayOfWeek: "Saturday", TotalPrice: 35.85 },
  { Date: "2023-02-24", Time: "14:49", StoreID: "S5", Location: "Store D", Product: "Desk", Quantity: 3, UnitPrice: 267.06, PaymentType: "Credit Card", TransactionID: "TX300018", Cashier: "C4", StoreManager: "Liam", TimeOfDay: "Afternoon", DayOfWeek: "Friday", TotalPrice: 801.18 },
  { Date: "2023-07-26", Time: "17:49", StoreID: "S8", Location: "Store A", Product: "Desk", Quantity: 3, UnitPrice: 297.14, PaymentType: "Debit Card", TransactionID: "TX300019", Cashier: "C5", StoreManager: "Mia", TimeOfDay: "Evening", DayOfWeek: "Wednesday", TotalPrice: 891.42 },
  { Date: "2023-10-16", Time: "10:32", StoreID: "S5", Location: "Store D", Product: "Printer", Quantity: 7, UnitPrice: 206.04, PaymentType: "Cash", TransactionID: "TX300020", Cashier: "C4", StoreManager: "Noah", TimeOfDay: "Morning", DayOfWeek: "Monday", TotalPrice: 1442.28 },
  { Date: "2024-08-18", Time: "14:34", StoreID: "S10", Location: "Store A", Product: "Monitor", Quantity: 8, UnitPrice: 289.99, PaymentType: "Gift Card", TransactionID: "TX300021", Cashier: "C2", StoreManager: "Olivia", TimeOfDay: "Afternoon", DayOfWeek: "Sunday", TotalPrice: 2319.92 },
  { Date: "2023-07-31", Time: "21:07", StoreID: "S9", Location: "Store C", Product: "Printer", Quantity: 1, UnitPrice: 78.56, PaymentType: "Online", TransactionID: "TX300022", Cashier: "C2", StoreManager: "Liam", TimeOfDay: "Evening", DayOfWeek: "Monday", TotalPrice: 78.56 }
];

export const analyzeSalesData = () => {
  // Top performers by cashier
  const cashierPerformance = sampleSalesData.reduce((acc, record) => {
    if (!acc[record.Cashier]) {
      acc[record.Cashier] = 0;
    }
    acc[record.Cashier] += record.TotalPrice;
    return acc;
  }, {} as Record<string, number>);

  const topCashiers = Object.entries(cashierPerformance)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Product performance
  const productPerformance = sampleSalesData.reduce((acc, record) => {
    if (!acc[record.Product]) {
      acc[record.Product] = 0;
    }
    acc[record.Product] += record.TotalPrice;
    return acc;
  }, {} as Record<string, number>);

  const productData = Object.entries(productPerformance)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Store performance
  const storePerformance = sampleSalesData.reduce((acc, record) => {
    if (!acc[record.Location]) {
      acc[record.Location] = 0;
    }
    acc[record.Location] += record.TotalPrice;
    return acc;
  }, {} as Record<string, number>);

  const storeData = Object.entries(storePerformance)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return {
    topCashiers,
    productPerformance: productData,
    storePerformance: storeData
  };
};

export const generateChartData = (type: 'revenue' | 'trends') => {
  if (type === 'revenue') {
    const monthlyData = sampleSalesData.reduce((acc, record) => {
      const month = record.Date.substring(0, 7); // YYYY-MM
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += record.TotalPrice;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(monthlyData)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(-6); // Last 6 months
  }

  if (type === 'trends') {
    // Generate trend data for the last 6 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      name: month,
      value: Math.floor(Math.random() * 50000) + 30000 + (index * 5000)
    }));
  }

  return [];
};
