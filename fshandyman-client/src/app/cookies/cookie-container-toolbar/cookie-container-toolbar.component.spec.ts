import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieContainerToolbarComponent } from './cookie-container-toolbar.component';

describe('CookieContainerToolbarComponent', () => {
  let component: CookieContainerToolbarComponent;
  let fixture: ComponentFixture<CookieContainerToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieContainerToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieContainerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
