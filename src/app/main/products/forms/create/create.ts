import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../service/products-service/product.service';
import { InputString } from '../../../../components/input-string/input-string';
import { InputSelect } from '../../../../components/input-select/input-select';
import { InfoErrorBox } from '../../../../components/info-error-box/info-error-box';
import { SubmitButton } from '../../../../components/submit-button/submit-button';
import { CategoryService } from '../../../../service/category-service/category.service';
import { Category } from '../../../../service/category-service/category';
import { BrandService } from '../../../../service/brand-service/brand.service';
import { Brand } from '../../../../service/brand-service/brand';

@Component({
  imports: [
    FormsModule,
    InputString,
    InfoErrorBox,
    SubmitButton,
    InputSelect
  ],
  selector: 'app-create',
  styleUrl: './create.css',
  templateUrl: './create.html',
})
export class Create implements OnInit {
  name = '';
  ean = '';
  categoryId: number = 0;
  brandId: number = 0;

  categories: Category[] = [];
  brands: Brand[] = [];

  infoMessage = signal('');
  errorMessage = signal('');
  nameError = signal('');
  eanError = signal('');
  categoryIdError = signal('');
  brandIdError = signal('');

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
  }
  getAllBrands() {
    this.brandService.getBrands().subscribe({
      next: (brands) => {
        this.brands = brands;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  getAllCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
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
