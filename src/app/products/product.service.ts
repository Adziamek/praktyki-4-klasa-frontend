import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  private apiUrl =`${environment.apiUrl}/products`;

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
