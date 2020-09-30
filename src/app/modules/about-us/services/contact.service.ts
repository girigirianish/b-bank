import { Injectable } from '@angular/core';
import { ContactDetails } from '../models/contact-details';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {}

  public async sendContactDetails(
    contactDetails: ContactDetails
  ): Promise<boolean> {
    console.log(contactDetails);
    return true;
  }
}
