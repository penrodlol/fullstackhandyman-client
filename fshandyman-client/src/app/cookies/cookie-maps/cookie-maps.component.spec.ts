import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieMapsComponent } from './cookie-maps.component';

describe('CookieMapsComponent', () => {
  let component: CookieMapsComponent;
  let fixture: ComponentFixture<CookieMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
