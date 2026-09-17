import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-info-error-box',
  styleUrl: './info-error-box.css',
  templateUrl: './info-error-box.html',
})
export class InfoErrorBox {
  infoMessage = input<string>();
  errorMessage = input<string>();
}
