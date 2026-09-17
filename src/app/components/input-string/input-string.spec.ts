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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
