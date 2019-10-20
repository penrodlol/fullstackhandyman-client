import { TestBed } from '@angular/core/testing';

import { CookieBuilderService } from './cookie-builder.service';

describe('CookieBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieBuilderService = TestBed.get(CookieBuilderService);
    expect(service).toBeTruthy();
  });
});
