import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieTemplatesComponent } from './cookie-templates.component';

describe('CookieTemplatesComponent', () => {
  let component: CookieTemplatesComponent;
  let fixture: ComponentFixture<CookieTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
