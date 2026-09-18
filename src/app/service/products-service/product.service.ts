import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { environment } from '../../environments/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  private apiUrl =`${environment.apiProducts}`;

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  
  createProduct(name: string, ean: string, categoryIdToCheck: number, brandIdToCheck: number) {
    const categoryId =
      categoryIdToCheck === null || categoryIdToCheck === undefined
        ? null
        : Number(categoryIdToCheck);

    const brandId =
      brandIdToCheck === null || brandIdToCheck === undefined
        ? null
        : Number(brandIdToCheck);

    return this.http.post<Product>(`${environment.apiProducts}/add`, {
      name,
      ean,
      categoryId,
      brandId
    });
  }
}
