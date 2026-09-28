import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductLocationEditor } from './product-location-editor';
import { ProductLocationDto } from '../../service/products-service/product-dto';

describe('ProductLocationEditor', () => {
  let component: ProductLocationEditor;
  let fixture: ComponentFixture<ProductLocationEditor>;
  let rows: ProductLocationDto[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductLocationEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductLocationEditor);
    component = fixture.componentInstance;
    rows = [{ locationId: 4, quantity: 12 }];
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('locations', []);
    fixture.componentRef.setInput('namePrefix', 'add');
    fixture.detectChanges();
  });

  it('adds a new empty location row without changing existing rows', () => {
    const rowsChange = vi.fn();
    component.rowsChange.subscribe(rowsChange);

    component.addRow();

    expect(rowsChange).toHaveBeenCalledWith([
      { locationId: 4, quantity: 12 },
      { locationId: -1, quantity: 0 },
    ]);
    expect(rows).toEqual([{ locationId: 4, quantity: 12 }]);
  });

  it('updates only the selected row', () => {
    const rowsChange = vi.fn();
    component.rowsChange.subscribe(rowsChange);

    component.updateLocation(0, '8');
    component.updateQuantity(0, 20);

    expect(rowsChange).toHaveBeenNthCalledWith(1, [
      { locationId: 8, quantity: 12 },
    ]);
    expect(rowsChange).toHaveBeenNthCalledWith(2, [
      { locationId: 4, quantity: 20 },
    ]);
  });

  it('removes only the selected row', () => {
    fixture.componentRef.setInput('rows', [
      ...rows,
      { locationId: 9, quantity: 3 },
    ]);
    const rowsChange = vi.fn();
    component.rowsChange.subscribe(rowsChange);

    component.removeRow(0);

    expect(rowsChange).toHaveBeenCalledWith([
      { locationId: 9, quantity: 3 },
    ]);
  });
});