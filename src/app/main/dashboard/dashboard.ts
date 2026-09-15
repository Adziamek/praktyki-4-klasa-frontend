import { AuthService } from '../../auth/auth-service';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProductService } from '../../products/product.service';
import { Product } from '../../products/product';

@Component({
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private changeDetector = inject(ChangeDetectorRef);

  username: string | null = null;
  products: Product[] = [];

  constructor() {
    this.username = this.authService.getUsername();

    this.productService.getProducts().subscribe({
      next: products => {
        console.log('API ZWRÓCIŁO:', products);
        console.log('ILE:', products.length);

        this.products = products;

        this.changeDetector.detectChanges();
      },
      error: error => {
        console.error('BŁĄD:', error);
      }
    });
  }
}