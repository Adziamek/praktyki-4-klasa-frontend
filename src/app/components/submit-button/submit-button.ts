import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-submit-button',
  styleUrl: './submit-button.css',
  templateUrl: './submit-button.html',
})
export class SubmitButton {
  buttonText = input.required<string>();
}
