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
  errorMessage: string | null = null;

  constructor() {
    this.username = this.authService.getUsername();

    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.changeDetector.detectChanges();
      },
      error: error => {
        this.errorMessage = 'Nie udało się pobrać listy produktów.';
        this.changeDetector.detectChanges();
      }
    });
  }
}