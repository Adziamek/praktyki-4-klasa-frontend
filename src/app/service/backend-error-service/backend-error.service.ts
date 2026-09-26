import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, switchMap, timer } from 'rxjs';
import { environment } from '../../environments/environment/environment';
import { ToastNotificationService} from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class BackendErrorService {
  private readonly http: HttpClient;

  constructor(
    httpBackend: HttpBackend,
    private readonly toastService: ToastNotificationService
  ) {
    this.http = new HttpClient(httpBackend);
    this.startMonitoring();
  }

  private startMonitoring(): void {
    timer(0, 10_000).pipe(
      switchMap(() =>
        this.http.get(environment.apiUsers).pipe(
          switchMap(() => of(true)),
          catchError((error: HttpErrorResponse) =>
            of(error.status !== 0)
          )
        )
      )
    ).subscribe((backendConnected) => {
      if (backendConnected) {
        this.toastService.dismiss('backend');
      } else {
        this.toastService.show({
          id: 'backend',
          title: 'Connection error: Backend',
          message: 'Backend nie jest podłączony'
        });
      }
    });
  }
}
