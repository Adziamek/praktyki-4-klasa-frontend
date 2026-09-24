import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-input-select',
  styleUrl: './input-select.css',
  templateUrl: './input-select.html',
})
export class InputSelect {
  label = input.required<string>();
  id = input.required<string>();
  name = input.required<string>();

  placeholder = input<string>('Choose option');

  value = input<string | number>('');
  options = input.required<any[]>();

  valueKey = input<string>('id');
  labelKey = input<string>('name');

  error = input<string | null>(null);
  required = input<boolean>(false);

  valueChange = output<string>();

  onChange(value: string) {
    this.valueChange.emit(value);
  }
}
