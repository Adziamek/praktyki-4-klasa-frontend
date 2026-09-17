import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/products-service/product.service';

@Component({
  imports: [FormsModule],
  selector: 'app-create',
  styleUrl: './create.css',
  templateUrl: './create.html',
})
export class Create {
  name = '';
  ean = '';
  categoryId = '';

  infoMessage = signal('');
  errorMessage = signal('');
  nameError = signal('');
  eanError = signal('');
  categoryIdError = signal('');

  constructor(private productService: ProductService) {}

  create() {
    this.errorMessage.set('');
    this.infoMessage.set('');
    this.nameError.set('');
    this.eanError.set('');
    this.categoryIdError.set('');

    if (!this.name || !this.ean || !this.categoryId) {
      this.errorMessage.set('Name, EAN, and CategoryID are required.');
      return;
    }

    const categoryId = Number(this.categoryId);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      this.categoryIdError.set('Category ID must be a positive integer.');
      return;
    }

    this.productService.createProduct(
      this.name,
      this.ean,
      categoryId
    ).subscribe({
      next: (product) => {
        this.errorMessage.set('');
        this.infoMessage.set(`Product ${product.name} added.`);
      },

      error: (error) => {
        if (error.status === 400 && error.error?.errors) {
          const errors = error.error.errors;

          this.nameError.set(errors.Name?.[0] ?? '');
          this.eanError.set(errors.Ean?.[0] ?? '');
          this.categoryIdError.set(errors.CategoryId?.[0] ?? '');

          return;
        }

        this.errorMessage.set(
          error.error?.detail ?? 'Product adding failed. Please try again.'
        );
      }
    });
  }
}
