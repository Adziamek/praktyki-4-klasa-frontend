import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/products-service/product.service';
import { InputString } from '../../../components/input-string/input-string';
import { InfoErrorBox } from '../../../components/info-error-box/info-error-box';
import { SubmitButton } from '../../../components/submit-button/submit-button';

@Component({
  imports: [FormsModule, InputString, InputString, InfoErrorBox, SubmitButton],
  selector: 'app-create',
  styleUrl: './create.css',
  templateUrl: './create.html',
})
export class Create {
  name = '';
  ean = '';
  categoryId: number = 0;
  brandId: number = 0;

  infoMessage = signal('');
  errorMessage = signal('');
  nameError = signal('');
  eanError = signal('');
  categoryIdError = signal('');
  brandIdError = signal('');

  constructor(private productService: ProductService) {}

  create() {
    this.errorMessage.set('');
    this.infoMessage.set('');
    this.nameError.set('');
    this.eanError.set('');
    this.categoryIdError.set('');
    this.brandIdError.set('');

    this.productService.createProduct(
      this.name,
      this.ean,
      this.categoryId,
      this.brandId
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
          this.brandIdError.set(errors.BrandId?.[0] ?? '');

          return;
        }

        this.errorMessage.set(
          error.error?.detail ?? 'Product adding failed. Please try again.'
        );
      }
    });
  }
}
