import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieContainersComponent } from './cookie-containers.component';

describe('CookieContainersComponent', () => {
  let component: CookieContainersComponent;
  let fixture: ComponentFixture<CookieContainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieContainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
