import { TestBed, inject } from '@angular/core/testing';

import { BaseUrlInterceptor } from './base-url-interceptor';

describe('BaseUrlInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseUrlInterceptor]
    });
  });

  it('should be created', inject([BaseUrlInterceptor], (service: BaseUrlInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
