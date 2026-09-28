import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSelect } from '../../components/input-select/input-select';
import { Location } from '../../service/location-service/location';
import { ProductLocationDto } from '../../service/products-service/product-dto';

@Component({
  imports: [FormsModule, InputSelect],
  selector: 'app-product-location-editor',
  templateUrl: './product-location-editor.html',
})
export class ProductLocationEditor {
  rows = input.required<ProductLocationDto[]>();
  locations = input.required<Location[]>();
  namePrefix = input.required<string>();

  rowsChange = output<ProductLocationDto[]>();

  addRow(): void {
    this.rowsChange.emit([
      ...this.rows(),
      { locationId: -1, quantity: 0 },
    ]);
  }

  updateLocation(index: number, value: string): void {
    this.updateRow(index, { locationId: Number(value) });
  }

  updateQuantity(index: number, quantity: number): void {
    this.updateRow(index, { quantity });
  }

  removeRow(index: number): void {
    this.rowsChange.emit(this.rows().filter((_, rowIndex) => rowIndex !== index));
  }

  private updateRow(index: number, changes: Partial<ProductLocationDto>): void {
    this.rowsChange.emit(this.rows().map((row, rowIndex) =>
      rowIndex === index ? { ...row, ...changes } : row
    ));
  }
}