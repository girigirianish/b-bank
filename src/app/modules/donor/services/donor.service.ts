import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BLOOD_BANK_REST_URL } from 'src/app/app-rest.injection-token';
import { DonorsInformation } from '../models';
import { DONORS_DATA } from './doner-information';

export interface DonerSearchQuery {
  contactNumber: string;
  donorAddress: string;
  bloodSeekerName: string;
  bloodGroup: string;
}

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  constructor(
    @Inject(BLOOD_BANK_REST_URL) private readonly restUrl,
    private readonly http: HttpClient
  ) {}
  public async getDonersInformations(): Promise<any> {
    return { data: DONORS_DATA };
    return this.http
      .post<DonorsInformation[]>(`${this.restUrl}/donners/all`, new FormData())
      .toPromise();
  }

  public async searchDoner(donerSearchQuery: DonerSearchQuery): Promise<any> {
    return this.http
      .post(
        `${this.restUrl}/donor/search?`,
        this.prepareSearchDonerPayLoad(donerSearchQuery)
      )
      .toPromise();
  }

  private prepareSearchDonerPayLoad(
    donerSearchQuery: DonerSearchQuery
  ): FormData {
    const searchFromData = new FormData();
    searchFromData.append('contact_number', donerSearchQuery.contactNumber);
    searchFromData.append(
      'blood_seeker_name',
      donerSearchQuery.bloodSeekerName
    );
    searchFromData.append('donor_address', donerSearchQuery.donorAddress);
    searchFromData.append('blood_group', donerSearchQuery.bloodGroup);
    return searchFromData;
  }
}
