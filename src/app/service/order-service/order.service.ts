import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from '../../environments/environment/environment';
import { CustomerOrder } from './customer-order';

interface CurrentUser {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  private usersApi = `${environment.apiUsers}`;
  private ordersApi = `${environment.apiOrders}`;

  // Zwraca tylko zamowienia zalogowanego uzytkownika
  getMyOrders(): Observable<CustomerOrder[]> {
    return this.http.get<CurrentUser>(`${this.usersApi}/me`).pipe(
      switchMap(user =>
        this.http.get<CustomerOrder[]>(this.ordersApi).pipe(
          map(orders => orders.filter(order => order.userId === user.id))
        )
      )
    );
  }
}
