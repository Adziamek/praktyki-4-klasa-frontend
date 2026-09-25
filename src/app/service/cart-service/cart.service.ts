import {Injectable, signal, computed} from '@angular/core';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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
}
