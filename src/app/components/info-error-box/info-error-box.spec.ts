import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoErrorBox } from './info-error-box';

describe('InfoErrorBox', () => {
  let component: InfoErrorBox;
  let fixture: ComponentFixture<InfoErrorBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoErrorBox],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoErrorBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
