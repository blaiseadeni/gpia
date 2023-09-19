import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintListingComponent } from './print-listing.component';

describe('PrintListingComponent', () => {
  let component: PrintListingComponent;
  let fixture: ComponentFixture<PrintListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
