import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, of, switchMap, timer } from 'rxjs';
import { environment } from '../../environments/environment/environment';

@Injectable({ providedIn: 'root' })
export class BackendErrorService {
  readonly visible = signal(false);
  private readonly http: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
    this.startMonitoring();
  }

  show(): void {
    this.visible.set(true);
  }

  dismiss(): void {
    this.visible.set(false);
  }

  private startMonitoring(): void {
    timer(0, 10_000).pipe(
      switchMap(() => this.http.get(environment.apiUsers).pipe(
        switchMap(() => of(true)),
        catchError((error: HttpErrorResponse) => of(error.status !== 0))
      ))
    ).subscribe((backendConnected) => {
      if (backendConnected) {
        this.dismiss();
      } else {
        this.show();
      }
    });
  }
}