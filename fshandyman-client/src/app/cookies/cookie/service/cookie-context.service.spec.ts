import { TestBed } from '@angular/core/testing';

import { CookieContextService } from './cookie-context.service';

describe('CookieContextService', () => {
  let service: CookieContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
