import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentpayComponent } from './rentpay.component';

describe('RentpayComponent', () => {
  let component: RentpayComponent;
  let fixture: ComponentFixture<RentpayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentpayComponent]
    });
    fixture = TestBed.createComponent(RentpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
