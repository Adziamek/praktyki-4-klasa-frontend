import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input-string',
  styleUrl: './input-string.css',
  templateUrl: './input-string.html',
})
export class InputString  {
  label = input.required<string>();
  type = input<string>('text');
  id = input.required<string>();
  name = input.required<string>();
  placeholder = input<string>('');
  value = input<string>('');
  error = input<string | null>(null);
  required = input<boolean>(false);

  valueChange = output<string>();
}
