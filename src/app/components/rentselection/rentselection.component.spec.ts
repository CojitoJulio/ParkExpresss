import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentselectionComponent } from './rentselection.component';

describe('RentselectionComponent', () => {
  let component: RentselectionComponent;
  let fixture: ComponentFixture<RentselectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentselectionComponent]
    });
    fixture = TestBed.createComponent(RentselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
