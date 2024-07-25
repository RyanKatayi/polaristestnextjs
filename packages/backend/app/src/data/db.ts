// src/orderData.ts

export interface Order {
  id: string;
  orderDate: string; // ISO 8601 format
  customerName: string;
  attributedStaffName: string;
  total: number;
  commissionInDollars: number | null;
}

const calculateCommission = (order: Order): number => {
  const orderDate = new Date(order.orderDate);
  const day = orderDate.getDay();
  const hour = orderDate.getHours();
  let commission = 0;

  const isWeekend = (day === 5 || day === 6);
  const isNight = hour >= 20;

  if (isWeekend) {
    commission = Math.min(order.total, 50);
    if (order.total > 50) {
      commission += (order.total - 50) * 0.03;
    }
  } else if (isNight) {
    commission = Math.min(order.total, 100) * 0.03;
    if (order.total > 100) {
      commission += (order.total - 100) * 0.05;
    }
  } else {
    commission = order.total * 0.03;
  }

  return commission;
};

const orders: Order[] = [
  {
    id: "ORD001",
    orderDate: "2024-07-01T14:30:00Z",
    customerName: "John Doe",
    attributedStaffName: "Alice Johnson",
    total: 150.00,
    commissionInDollars: calculateCommission({
      id: "ORD001",
      orderDate: "2024-07-01T14:30:00Z",
      customerName: "John Doe",
      attributedStaffName: "Alice Johnson",
      total: 150.00,
      commissionInDollars: null
    })
  },
  {
    id: "ORD002",
    orderDate: "2024-07-02T20:45:00Z",
    customerName: "Jane Smith",
    attributedStaffName: "Bob Brown",
    total: 250.00,
    commissionInDollars: calculateCommission({
      id: "ORD002",
      orderDate: "2024-07-02T20:45:00Z",
      customerName: "Jane Smith",
      attributedStaffName: "Bob Brown",
      total: 250.00,
      commissionInDollars: null
    })
  },
  {
    id: "ORD003",
    orderDate: "2024-07-03T10:15:00Z",
    customerName: "Michael Johnson",
    attributedStaffName: "Charlie Davis",
    total: 90.00,
    commissionInDollars: calculateCommission({
      id: "ORD003",
      orderDate: "2024-07-03T10:15:00Z",
      customerName: "Michael Johnson",
      attributedStaffName: "Charlie Davis",
      total: 90.00,
      commissionInDollars: null
    })
  },
  {
    id: "ORD004",
    orderDate: "2024-07-04T22:00:00Z",
    customerName: "Emily White",
    attributedStaffName: "David Clark",
    total: 120.00,
    commissionInDollars: calculateCommission({
      id: "ORD004",
      orderDate: "2024-07-04T22:00:00Z",
      customerName: "Emily White",
      attributedStaffName: "David Clark",
      total: 120.00,
      commissionInDollars: null
    })
  },
  {
    id: "ORD005",
    orderDate: "2024-07-05T16:30:00Z",
    customerName: "Sarah Miller",
    attributedStaffName: "Eve Thompson",
    total: 80.00,
    commissionInDollars: calculateCommission({
      id: "ORD005",
      orderDate: "2024-07-05T16:30:00Z",
      customerName: "Sarah Miller",
      attributedStaffName: "Eve Thompson",
      total: 80.00,
      commissionInDollars: null
    })
  }
];

export default orders;
