import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieTableComponent } from './cookie-table.component';

describe('CookieTableComponent', () => {
  let component: CookieTableComponent;
  let fixture: ComponentFixture<CookieTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
