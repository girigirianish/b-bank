import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BLOOD_BANK_REST_URL } from '../../../app-rest.injection-token';

export interface BloodGroupApiResponse {
  'A+VE': 'A+VE';
  'A-VE': 'A-VE';
  'AB+VE': 'AB+VE';
  'AB-VE': 'AB-VE';
  'B+VE': 'B+VE';
  'B-VE': 'B-VE';
  'O+VE': 'O+VE';
  'O-VE': 'O-VE';
}

@Injectable({
  providedIn: 'root',
})
export class BloodGroupService {
  constructor(
    @Inject(BLOOD_BANK_REST_URL) private readonly restUrl,
    private readonly http: HttpClient
  ) {}

  public getBloodGroups(): Promise<BloodGroupApiResponse> {
    return this.http
      .post<BloodGroupApiResponse>(
        `${this.restUrl}/blood-groups`,
        new FormData()
      )
      .toPromise();
  }
}
