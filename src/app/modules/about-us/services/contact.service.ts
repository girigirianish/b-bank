import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BLOOD_BANK_REST_URL } from 'src/app/app-rest.injection-token';

import { ContactDetails } from '../models/contact-details';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    @Inject(BLOOD_BANK_REST_URL) private readonly restUrl,
    private readonly http: HttpClient
  ) {}

  public async sendContactDetails(
    contactDetails: ContactDetails
  ): Promise<any> {
    return this.http
      .post(
        `${this.restUrl}/feedback/store`,
        this.prepareContactRequestPayload(contactDetails)
      )
      .toPromise();
  }

  private prepareContactRequestPayload(
    contactDetails: ContactDetails
  ): FormData {
    const formData: FormData = new FormData();
    formData.append('first_name', contactDetails.firstName);
    formData.append('last_name', contactDetails.lastName);
    formData.append('email', contactDetails.email);
    formData.append('subject', contactDetails.subject);
    formData.append('message', contactDetails.message);
    return formData;
  }

  public async getContactDetails(): Promise<any> {
    return this.http
      .post(`${this.restUrl}/contact-details`, new FormData())
      .toPromise();
  }
}
