import { TestBed, inject } from '@angular/core/testing';

import { TSDocService } from './tsdoc.service';

describe('TSDocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TSDocService]
    });
  });

  it('should be created', inject([TSDocService], (service: TSDocService) => {
    expect(service).toBeTruthy();
  }));
});
