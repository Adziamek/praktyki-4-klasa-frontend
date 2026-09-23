import { Component, signal, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/products-service/product.service'; 
import { InputString } from '../../components/input-string/input-string'; 
import { InputSelect } from '../../components/input-select/input-select';
import { InfoErrorBox } from '../../components/info-error-box/info-error-box'; 
import { SubmitButton } from '../../components/submit-button/submit-button';
import { Product } from '../../service/products-service/product';
import { ProductDto } from '../../service/products-service/product-dto';
import { Category } from '../../service/category-service/category';
import { Brand } from '../../service/brand-service/brand';
import { CategoryService } from '../../service/category-service/category.service';
import { BrandService } from '../../service/brand-service/brand.service';

@Component({
  imports: [
    FormsModule,
    InputString,
    InfoErrorBox,
    SubmitButton,
    InputSelect
  ],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private brandService = inject(BrandService);
  private changeDetector = inject(ChangeDetectorRef);

  isSideOpen = signal(false);
  isEditOpen = signal(false);
  isDeleteOpen = signal(false);

  products: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];

  addProductData: ProductDto = {
    name: '',
    ean: '',
    categoryId: -1,
    brandId: -1
  };
  
  id = '';
  editProductData: ProductDto = {
    name: '',
    ean: '',
    categoryId: -1,
    brandId: -1
  };

  infoMessage = signal('');
  errorMessage = signal('');
  nameError = signal('');
  eanError = signal('');
  categoryError = signal('');
  brandError = signal('');

  ngOnInit(): void {
    this.showProducts();
    this.getCategoriesAndBrands();
  }

  openCloseSide() {
    this.isSideOpen.update(value => !value);

    if (!this.isSideOpen())
        this.clearMessages();
  }

  openEdit(id: string) {
    let product = this.products.find(x => x.id === id);

    if (product == null)
        return;

    this.id = id;
    this.editProductData = {
        name: product.name,
        ean: product.ean,
        categoryId: product.categoryId,
        brandId: product.brandId
    };

    this.clearMessages();

    if (this.isSideOpen())
        this.openCloseSide();

    this.isEditOpen.set(true);
  }

  closeEdit() {
    this.isEditOpen.set(false);
    this.clearMessages();
  }

  openDelete(id: string) {
    this.clearMessages();

    this.id = id;
    this.isDeleteOpen.set(true);

    this.closeEdit();
  }

  closeDelete() {
    this.id = '';
    this.isDeleteOpen.set(false);
    this.clearMessages();
  }

  clearMessages() {
    this.infoMessage.set('');
    this.errorMessage.set('');
    this.nameError.set('');
    this.eanError.set('');
    this.categoryError.set('');
    this.brandError.set('');
  }

  showProducts() {
    this.productService.getProducts().subscribe({
        next: products => {
            this.products = products;
            this.changeDetector.detectChanges();
        },
        error: error => {
            console.error('Error:', error);
        }
    });
  }

  getCategoriesAndBrands() {
    this.categoryService.getCategories().subscribe({
      next: categories => {
        this.categories = categories;
      },
      error: error => {
          console.error('Error:', error);
      }
    })

    this.brandService.getBrands().subscribe({
      next: brands => {
        this.brands = brands;
      },
      error: error => {
          console.error('Error:', error);
      }
    })

    console.log(this.categories + " | " + this.brands);
  }

  addProduct() {
      this.clearMessages();

      this.productService.addProduct(
          this.addProductData
      ).subscribe({
          next: () => {
              this.infoMessage.set("Product added.");
              this.showProducts();
          },
          error: (error) => {
            if (error.status === 400 && error.error?.errors) {
                const errors = error.error.errors;

                this.nameError.set(errors.Name?.[0] ?? '');
                this.eanError.set(errors.Ean?.[0] ?? '');
                this.categoryError.set(errors.CategoryId?.[0] ?? '');
                this.brandError.set(errors.BrandId?.[0] ?? '');

                return;
            }

            this.errorMessage.set(error.error?.detail ?? 'Adding failed. Please try again.');
          }
      })
  }

  editProduct() {
      this.clearMessages();

      this.productService.editProduct(
          this.id,
          this.editProductData
      ).subscribe({
          next: () => {
              this.infoMessage.set("Product changed.");
              this.showProducts();
          },
          error: (error) => {
              if (error.status === 400 && error.error?.errors) {
                  const errors = error.error.errors;

                  this.nameError.set(errors.Name?.[0] ?? '');
                  this.eanError.set(errors.Ean?.[0] ?? '');
                  this.categoryError.set(errors.CategoryId?.[0] ?? '');
                  this.brandError.set(errors.BrandId?.[0] ?? '');

                  return;
              }

              this.errorMessage.set(error.error?.detail ?? 'Editing failed. Please try again.');
          }
      })
  }

  deleteProduct() {
      this.productService.deleteLocation(this.id).subscribe({
          next: () => {
              this.infoMessage.set("Product deleted.");
              this.showProducts();
          },
          error: (error) => {
              this.errorMessage.set(error.error?.detail ?? 'Deleting failed. Please try again.');
          }
      })
  }
}
