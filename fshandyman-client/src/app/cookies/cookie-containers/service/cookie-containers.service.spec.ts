import { TestBed } from '@angular/core/testing';

import { CookieContainersService } from './cookie-containers.service';

describe('CookieContainersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieContainersService = TestBed.get(CookieContainersService);
    expect(service).toBeTruthy();
  });
});
