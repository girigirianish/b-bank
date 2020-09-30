import { Injectable } from '@angular/core';

import { RegistrationDetails } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor() {}

  public async register(
    registrationDetails: RegistrationDetails
  ): Promise<boolean> {
    console.log(registrationDetails);
    return true;
  }
}
