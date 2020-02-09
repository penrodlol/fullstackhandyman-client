import { TestBed } from '@angular/core/testing';

import { CookieMapsService } from './cookie-maps.service';

describe('CookieMapsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieMapsService = TestBed.get(CookieMapsService);
    expect(service).toBeTruthy();
  });
});
