import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductService } from '../../service/products-service/product.service';
import { CartService } from '../../service/cart-service/cart.service';
import { ToastNotificationService } from '../../service/toast-service/toast.service';
import { Product } from '../../service/products-service/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.html',
})
export class Catalog implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toastNotificationService = inject(ToastNotificationService);

  products = signal<Product[]>([]);
  errorMessage = signal('');

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => this.products.set(products),
      error: error => {
        console.error('Error:', error);
        this.errorMessage.set('Could not load products.');
      }
    });
  }

  addToCart(productId: number) {
    this.cartService.add(productId);
    this.toastNotificationService.show({
      id: 'cart',
      title: 'cart',
      message: 'Product added to cart!',
      variant: 'success'
    });
  }
}
