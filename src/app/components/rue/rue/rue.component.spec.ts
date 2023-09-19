import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RueComponent } from './rue.component';

describe('RueComponent', () => {
  let component: RueComponent;
  let fixture: ComponentFixture<RueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
