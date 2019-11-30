import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCookieContainerComponent } from './create-cookie-container.component';

describe('CreateCookieContainerComponent', () => {
  let component: CreateCookieContainerComponent;
  let fixture: ComponentFixture<CreateCookieContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCookieContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCookieContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
