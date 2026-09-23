import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProductService } from '../../service/products-service/product.service';
import { LocationsService } from '../../service/location-service/locations-service';
import { AuthService } from '../../service/auth-service/auth-service';
import { Product } from '../../service/products-service/product';

@Component({
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private locationsService = inject(LocationsService);
  private changeDetector = inject(ChangeDetectorRef);

  username: string | null = null;
  errorMessage: string | null = null;
  productsCount = 0;
  locationsCount = 0;

  constructor() {
    this.username = this.authService.getUsername();

    this.productService.getProducts().subscribe({
      next: products => {
        this.productsCount = products.length;
        this.changeDetector.detectChanges();
      },
      error: error => {
        this.errorMessage = "Can't connect to database.";
        console.error('Error:', error);
        this.changeDetector.detectChanges();
      },
    });

    this.locationsService.getAllLocations().subscribe({
      next: locations => {
        this.locationsCount = locations.length;
        this.changeDetector.detectChanges();
      },
      error: error => {
        this.errorMessage += "Can't connect to database.";
        console.error('Error:', error);
      }
    });
  }
}
