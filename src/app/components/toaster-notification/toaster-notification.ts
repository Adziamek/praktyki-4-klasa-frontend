import { Component, inject } from '@angular/core';
import { ToastNotificationService} from '../../service/toast-service/toast.service';

@Component({
  selector: 'app-toaster-notification',
  templateUrl: './toaster-notification.html',
  styleUrl: './toaster-notification.css'
})
export class ToasterNotification {
  readonly toastService = inject(ToastNotificationService);

  dismiss(): void {
    const notification = this.toastService.notification();

    if (notification) {
      this.toastService.dismiss(notification.id);
    }
  }
}
