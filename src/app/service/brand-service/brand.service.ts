import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from './brand';
import { environment } from '../../environments/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private http = inject(HttpClient);

  private apiUrl =`${environment.apiBrands}`;

  getBrands = () => {
    return this.http.get<Brand[]>(this.apiUrl);
  }

}
