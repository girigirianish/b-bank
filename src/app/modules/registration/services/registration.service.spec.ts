import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BLOOD_BANK_REST_URL } from 'src/app/app-rest.injection-token';

import { RegistrationService } from './registration.service';

fdescribe('RegistrationService', () => {
  let service: RegistrationService;
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
    service = TestBed.inject(RegistrationService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('should do a post request for doner registration', () => {
      const registrationDetails = {
        bloodGroup: 'A+',
        district: 'somedistrict',
        email: 'someemail@gmail.com',
        lastDonated: new Date(),
        lat: 0,
        lng: 4,
        name: 'some name',
        permanentAddress: 'some address',
        phoneNumber: 'somephonenumber',
        temporaryAddress: 'sometemporary address',
      };
      const formData: FormData = new FormData();
      formData.append('name', registrationDetails.name);
      formData.append('email', registrationDetails.email);
      formData.append('contact_no', registrationDetails.phoneNumber);
      formData.append('blood_group', registrationDetails.bloodGroup);
      formData.append(
        'permanent_address',
        registrationDetails.permanentAddress
      );
      formData.append(
        'temporary_address',
        registrationDetails.temporaryAddress
      );
      formData.append('lat', registrationDetails.lat.toString());
      formData.append('lng', registrationDetails.lng.toString());
      service.register(registrationDetails);
      const req = httpMock.expectOne('/api/admin/api/register/donor');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(formData);
      httpMock.verify();
    });
  });
});
