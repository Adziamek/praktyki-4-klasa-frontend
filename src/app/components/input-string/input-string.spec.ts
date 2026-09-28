import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputString } from './input-string';

describe('InputString', () => {
  let component: InputString;
  let fixture: ComponentFixture<InputString>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputString],
    }).compileComponents();

    fixture = TestBed.createComponent(InputString);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Name');
    fixture.componentRef.setInput('id', 'name');
    fixture.componentRef.setInput('name', 'name');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the input value', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const valueChange = vi.fn();
    component.valueChange.subscribe(valueChange);

    input.value = 'Ada';
    input.dispatchEvent(new Event('input'));

    expect(valueChange).toHaveBeenCalledWith('Ada');
  });
});
