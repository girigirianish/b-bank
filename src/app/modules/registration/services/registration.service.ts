import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BLOOD_BANK_REST_URL } from 'src/app/app-rest.injection-token';

import { RegistrationDetails } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(
    @Inject(BLOOD_BANK_REST_URL) private readonly restUrl,
    private readonly http: HttpClient
  ) {}

  public async register(
    registrationDetails: RegistrationDetails
  ): Promise<any> {
    return this.http
      .post(
        `${this.restUrl}/register/donor`,
        this.prepareRegisterRequestPayload(registrationDetails)
      )
      .toPromise();
  }

  private prepareRegisterRequestPayload(
    registrationDetails: RegistrationDetails
  ): FormData {
    const formData: FormData = new FormData();
    formData.append('name', registrationDetails.name);
    formData.append('email', registrationDetails.email);
    formData.append('contact_no', registrationDetails.phoneNumber);
    formData.append('blood_group', registrationDetails.bloodGroup);
    formData.append('permanent_address', registrationDetails.permanentAddress);
    formData.append('temporary_address', registrationDetails.temporaryAddress);
    formData.append('lat', registrationDetails.lat.toString());
    formData.append('lng', registrationDetails.lng.toString());

    if (registrationDetails.lastDonated) {
      const dd = String(registrationDetails.lastDonated.getDate()).padStart(
        2,
        '0'
      );
      const mm = String(
        registrationDetails.lastDonated.getMonth() + 1
      ).padStart(2, '0');
      const yyyy = registrationDetails.lastDonated.getFullYear();

      formData.append('last_donated_at', `${yyyy}/${mm}/${dd}`);
    }

    return formData;
  }
}
