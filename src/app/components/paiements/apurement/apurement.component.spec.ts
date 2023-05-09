import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApurementComponent } from './apurement.component';

describe('ApurementComponent', () => {
  let component: ApurementComponent;
  let fixture: ComponentFixture<ApurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApurementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
