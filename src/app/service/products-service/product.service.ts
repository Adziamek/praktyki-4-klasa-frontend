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

  private apiUrl =`${environment.apiProducts}`;

  checkDto(dto: ProductDto) : ProductDto {
    const checkedCategoryId =
      dto.categoryId === null || dto.categoryId === undefined
        ? 0
        : Number(dto.categoryId);

    const checkedBrandId =
      dto.brandId === null || dto.brandId === undefined
        ? 0
        : Number(dto.brandId);

    let newDto: ProductDto = {
      name: dto.name,
      ean: dto.ean,
      categoryId: checkedCategoryId,
      brandId: checkedBrandId
    }

    return newDto;
  }

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${environment.apiProducts}/${id}`);
  }

  addProduct(productDto: ProductDto) {
    productDto = this.checkDto(productDto);
    return this.http.post<Product>(`${environment.apiProducts}`, productDto);
  }

  editProduct(id: string, productDto: ProductDto) {
    productDto = this.checkDto(productDto);
    return this.http.put(`${environment.apiProducts}/${id}`, productDto);
  }

  deleteLocation(id: string) {
    return this.http.delete(`${environment.apiProducts}/${id}`);
  }
}
