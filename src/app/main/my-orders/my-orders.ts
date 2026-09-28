import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../service/order-service/order.service';
import { ProductService } from '../../service/products-service/product.service';
import { CustomerOrder } from '../../service/order-service/customer-order';

@Component({
  imports: [DatePipe],
  selector: 'app-my-orders',
  templateUrl: './my-orders.html',
})
export class MyOrders implements OnInit {
  private orderService = inject(OrderService);
  private productService = inject(ProductService);

  orders = signal<CustomerOrder[]>([]);
  productNames = signal<Record<number, string>>({});
  errorMessage = signal('');

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        const names: Record<number, string> = {};
        products.forEach(product => names[product.id] = product.name);
        this.productNames.set(names);
      },
      error: error => console.error('Error:', error)
    });

    this.orderService.getMyOrders().subscribe({
      next: orders => this.orders.set(
        [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      ),
      error: error => {
        console.error('Error:', error);
        this.errorMessage.set('Could not load orders.');
      }
    });
  }

  getProductName(productId: number): string {
    return this.productNames()[productId] ?? `#${productId}`;
  }

  getTotal(order: CustomerOrder): number {
    return order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }
}
