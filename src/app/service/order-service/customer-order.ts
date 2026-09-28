export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface CustomerOrder {
  id: number;
  userId: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}
