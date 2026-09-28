import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { environment } from '../../environments/environment/environment';
import { ProductDto } from './product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiProducts}`;

  checkDto(dto: ProductDto): ProductDto {
    const checkedCategoryId =
      dto.categoryId === null || dto.categoryId === undefined
        ? 0
        : Number(dto.categoryId);

    const checkedBrandId =
      dto.brandId === null || dto.brandId === undefined
        ? 0
        : Number(dto.brandId);

    const newDto: ProductDto = {
      name: dto.name,
      ean: dto.ean,
      categoryId: checkedCategoryId,
      brandId: checkedBrandId,
      price: dto.price,
      locations: dto.locations
    };

    return newDto;
  }

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(productDto: ProductDto) {
    productDto = this.checkDto(productDto);

    return this.http.post<Product>(
      this.apiUrl,
      productDto
    );
  }

  editProduct(id: number, productDto: ProductDto) {
    productDto = this.checkDto(productDto);

    return this.http.put(
      `${this.apiUrl}/${id}`,
      productDto
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
