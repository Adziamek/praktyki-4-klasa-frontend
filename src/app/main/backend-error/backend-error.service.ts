import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BackendErrorService {
  readonly visible = signal(false);

  show(): void {
    this.visible.set(true);
  }

  dismiss(): void {
    this.visible.set(false);
  }
}