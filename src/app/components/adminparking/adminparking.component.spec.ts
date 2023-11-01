import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminparkingComponent } from './adminparking.component';

describe('AdminparkingComponent', () => {
  let component: AdminparkingComponent;
  let fixture: ComponentFixture<AdminparkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminparkingComponent]
    });
    fixture = TestBed.createComponent(AdminparkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
