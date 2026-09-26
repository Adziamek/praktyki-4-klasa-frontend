import { Component, effect, inject, signal } from '@angular/core';
import { CartService } from '../../service/cart-service/cart.service';
import { ProductService } from '../../service/products-service/product.service';
import { Product } from '../../service/products-service/product';
import { SubmitButton } from '../../components/submit-button/submit-button';

@Component({
  imports: [SubmitButton],
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.html',
})
export class ShoppingCart {

  private cartService = inject(CartService);
  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  constructor() {
    effect(() => {
      const items = this.cartService.items();

      if (items.length === 0) {
        this.products.set([]);
        return;
      }

      items.forEach(item => {
        this.productService.getProduct(item.productId).subscribe({
          next: product => {
            this.products.update(products => {
              // nie dodawaj drugi raz tego samego produktu
              if (products.some(x => x.id === product.id)) {
                return products;
              }

              return [...products, product];
            });
          },
          error: error => {
            console.error(
              `Could not load product ${item.productId}`,
              error
            );
          }
        });
      });
    });
  }

  getQuantity(productId: string): number {
    return this.cartService.items()
      .find(item => item.productId === productId)
      ?.quantity ?? 0;
  }

  increase(productId: string): void {
    this.cartService.add(productId);
  }

  decrease(productId: string): void {
    this.cartService.decrease(productId);
  }

  remove(productId: string): void {
    this.cartService.remove(productId);

    this.products.update(products =>
      products.filter(x => x.id !== productId)
    );
  }
  clear(): void {
    this.cartService.clear();
  }
  checkoutCart() {
    this.cartService.checkout().subscribe({
      next: response => {
        console.log('Order created:', response);
        this.cartService.clear();
      },
      error: error => {
        console.error('Checkout failed:', error);
      }
    });
  }
}
