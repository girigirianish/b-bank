import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BLOOD_BANK_REST_URL } from '../../../app-rest.injection-token';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(
    @Inject(BLOOD_BANK_REST_URL) private readonly restUrl,
    private readonly http: HttpClient
  ) {}

  public async getEvents(): Promise<any> {
    return await this.http
      .post<any>(`${this.restUrl}/donation-events?`, new FormData())
      .toPromise();
  }
}
