import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToasterNotification } from './components/toaster-notification/toaster-notification';
import { BackendErrorService} from './service/backend-error-service/backend-error.service';

@Component({
  imports: [RouterOutlet, ToasterNotification],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly backendErrorService = inject(BackendErrorService);
}
