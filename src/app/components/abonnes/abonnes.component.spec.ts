import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnesComponent } from './abonnes.component';

describe('AbonnesComponent', () => {
  let component: AbonnesComponent;
  let fixture: ComponentFixture<AbonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbonnesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
