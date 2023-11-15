import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentprocessComponent } from './rentprocess.component';

describe('RentprocessComponent', () => {
  let component: RentprocessComponent;
  let fixture: ComponentFixture<RentprocessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentprocessComponent]
    });
    fixture = TestBed.createComponent(RentprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
