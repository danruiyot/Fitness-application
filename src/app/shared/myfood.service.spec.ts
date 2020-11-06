import { TestBed } from '@angular/core/testing';

import { MyfoodService } from './myfood.service';

describe('MyfoodService', () => {
  let service: MyfoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyfoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
