import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackendError } from './main/backend-error/backend-error';

@Component({
  imports: [RouterOutlet, BackendError],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
