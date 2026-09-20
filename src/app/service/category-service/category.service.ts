import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { environment } from '../../environments/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  private apiUrl =`${environment.apiCategories}`;

  getCategories = () => {
    return this.http.get<Category[]>(this.apiUrl);
  }

}
