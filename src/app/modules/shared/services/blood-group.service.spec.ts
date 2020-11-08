import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BLOOD_BANK_REST_URL } from 'src/app/app-rest.injection-token';

import { BloodGroupService } from './blood-group.service';

fdescribe('BloodGroupService', () => {
  let service: BloodGroupService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BLOOD_BANK_REST_URL,
          useFactory: () => {
            return '/api/admin/api';
          },
        },
      ],
    });
    injector = getTestBed();
    service = TestBed.inject(BloodGroupService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBloodGroups', () => {
    it('should do a get request for blood group and return it', () => {
      service.getBloodGroups().then(() => {});
      const req = httpMock.expectOne('/api/admin/api/blood-groups');
      expect(req.request.method).toBe('POST');
    });
  });
});
