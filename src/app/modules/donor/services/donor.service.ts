import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BLOOD_BANK_REST_URL } from 'src/app/app-rest.injection-token';
import { DonorsInformation } from '../models';

export interface DonerSearchQuery {
  contactNumber: string;
  donorAddress: string;
  bloodSeekerName: string;
  bloodGroup: string;
}

export interface DonerSearchResponse {
  search_results: DonorsInformation[];
  bearer_token: string;
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
    return this.http
      .post<DonorsInformation[]>(`${this.restUrl}/donor/all`, new FormData())
      .toPromise();
  }

  public async searchDoner(donerSearchQuery: DonerSearchQuery): Promise<any> {
    const searchResponse = await this.http
      .post<DonerSearchResponse>(
        `${this.restUrl}/donor/search?`,
        this.prepareSearchDonerPayLoad(donerSearchQuery)
      )
      .toPromise();

    if (searchResponse.search_results && searchResponse.search_results.length) {
      window.localStorage.setItem('searchToken', searchResponse.bearer_token);
    }

    return searchResponse.search_results;
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

  public async sendSmsToDoner(donorId: number): Promise<any> {
    return this.http
      .post<DonerSearchResponse>(
        `${this.restUrl}/sms-to/donor`,
        this.prepareEmailSmsPayload(donorId)
      )
      .toPromise();
  }

  public async sendEmailToDoner(donorId: number): Promise<any> {
    return this.http
      .post<DonerSearchResponse>(
        `${this.restUrl}/email-to/donor`,
        this.prepareEmailSmsPayload(donorId)
      )
      .toPromise();
  }

  private prepareEmailSmsPayload(id: number): FormData {
    const emailSmsPayload = new FormData();
    emailSmsPayload.append('donor_id', id.toString());
    return emailSmsPayload;
  }
}
