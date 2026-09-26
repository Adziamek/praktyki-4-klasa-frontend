import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToasterNotification } from './toaster-notification';

describe('ToasterNotification', () => {
  let component: ToasterNotification;
  let fixture: ComponentFixture<ToasterNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToasterNotification],
    }).compileComponents();

    fixture = TestBed.createComponent(ToasterNotification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
