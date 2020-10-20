import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BLOOD_BANK_REST_URL } from '../../../app-rest.injection-token';

export interface PagesApiResponse {
  data: {
    content: string;
    created_at: string;
    id: number;
    type: string;
    updated_at: string;
  };
}

export type PageName = 'about-us' | 'term-condition' | 'privacy-policy';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(
    @Inject(BLOOD_BANK_REST_URL) private readonly restUrl,
    private readonly http: HttpClient
  ) {}

  public async getPageContent(pageName: PageName): Promise<string> {
    const response = await this.http
      .post<PagesApiResponse>(
        `${this.restUrl}/pages`,
        this.preparePagesPayload(pageName)
      )
      .toPromise();
    return response.data.content;
  }

  private preparePagesPayload(pageName: PageName): FormData {
    const formData: FormData = new FormData();
    formData.append('page-name', pageName);
    return formData;
  }
}
