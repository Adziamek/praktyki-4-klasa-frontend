import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { CartItem } from './cart-item';
import { environment } from '../../environments/environment/environment';

interface CurrentUser {
  id: string;
  email: string;
}

interface CreateOrderRequest {
  userId: string;
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private http = inject(HttpClient);

  private usersApi = `${environment.apiUsers}`;
  private ordersApi = `${environment.apiOrders}`;

  private itemsSignal = signal<CartItem[]>([]);

  items = this.itemsSignal.asReadonly();

  count = computed(() =>
    this.itemsSignal().reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  );

  add(productId: string): void {
    this.itemsSignal.update(items => {
      const existing = items.find(x => x.productId === productId);

      if (existing) {
        return items.map(x =>
          x.productId === productId
            ? { ...x, quantity: x.quantity + 1 }
            : x
        );
      }

      return [
        ...items,
        {
          productId,
          quantity: 1
        }
      ];
    });
  }

  remove(productId: string): void {
    this.itemsSignal.update(items =>
      items.filter(x => x.productId !== productId)
    );
  }

  decrease(productId: string): void {
    this.itemsSignal.update(items =>
      items
        .map(x =>
          x.productId === productId
            ? { ...x, quantity: x.quantity - 1 }
            : x
        )
        .filter(x => x.quantity > 0)
    );
  }

  clear(): void {
    this.itemsSignal.set([]);
  }

  checkout() {
    return this.http
      .get<CurrentUser>(`${this.usersApi}/me`)
      .pipe(
        switchMap(user => {
          const request: CreateOrderRequest = {
            userId: user.id,
            items: this.itemsSignal()
          };

          return this.http.post(this.ordersApi, request);
        })
      );
  }
}
