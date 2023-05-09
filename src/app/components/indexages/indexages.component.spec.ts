import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexagesComponent } from './indexages.component';

describe('IndexagesComponent', () => {
  let component: IndexagesComponent;
  let fixture: ComponentFixture<IndexagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
