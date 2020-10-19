import { TestBed } from '@angular/core/testing';

import { GeoCodeService } from './geo-code.service';

describe('GeoCodeService', () => {
  let service: GeoCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
