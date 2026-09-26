import { Injectable, signal } from '@angular/core';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {
  readonly notification = signal<ToastNotification | null>(null);

  show(notification: ToastNotification): void {
    this.notification.set(notification);
  }

  dismiss(id: string): void {
    if (this.notification()?.id === id) {
      this.notification.set(null);
    }
  }
}
