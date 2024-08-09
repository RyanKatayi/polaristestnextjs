export interface Order {
  id: string;
  orderDate: string; // ISO 8601 format
  customerName: string;
  attributedStaffName: string;
  total: number;
  commissionInDollars: number | null;
}

const orders: Order[] = [
  {
    id: "ORD001",
    orderDate: "2024-07-01T14:30:00Z",
    customerName: "John Doe",
    attributedStaffName: "Alice Johnson",
    total: 150.00,
    commissionInDollars: 4.50
  },
  {
    id: "ORD002",
    orderDate: "2024-07-02T20:45:00Z",
    customerName: "Jane Smith",
    attributedStaffName: "Bob Brown",
    total: 250.00,
    commissionInDollars: 10.50
  },
  {
    id: "ORD003",
    orderDate: "2024-07-03T10:15:00Z",
    customerName: "Michael Johnson",
    attributedStaffName: "Charlie Davis",
    total: 90.00,
    commissionInDollars: 2.70
  },
  {
    id: "ORD004",
    orderDate: "2024-07-04T22:00:00Z",
    customerName: "Emily White",
    attributedStaffName: "David Clark",
    total: 120.00,
    commissionInDollars: 4.00
  },
  {
    id: "ORD005",
    orderDate: "2024-07-05T16:30:00Z",
    customerName: "Sarah Miller",
    attributedStaffName: "Eve Thompson",
    total: 80.00,
    commissionInDollars: 50.90
  }
];

export default orders;
