import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavElement } from './nav-element';

describe('NavElement', () => {
  let component: NavElement;
  let fixture: ComponentFixture<NavElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavElement],
    }).compileComponents();

    fixture = TestBed.createComponent(NavElement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
