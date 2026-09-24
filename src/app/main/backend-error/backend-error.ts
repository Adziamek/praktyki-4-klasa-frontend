import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { BackendErrorService } from './backend-error.service';

@Component({
  selector: 'app-backend-error',
  templateUrl: './backend-error.html',
  styleUrl: './backend-error.css'
})
export class BackendError {
  readonly backendErrorService = inject(BackendErrorService);

  dismiss(): void {
    this.backendErrorService.dismiss();
  }
}