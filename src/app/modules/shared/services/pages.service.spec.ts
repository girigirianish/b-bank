import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BLOOD_BANK_REST_URL } from 'src/app/app-rest.injection-token';

import { PagesService } from './pages.service';

fdescribe('PagesService', () => {
  let service: PagesService;
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
    service = TestBed.inject(PagesService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPageContent', () => {
    it('should get page content and return it', () => {
      const formData: FormData = new FormData();
      formData.append('page-name', 'term-condition');

      service.getPageContent('term-condition').then((content) => {
        expect(content).toBe('Mock page content');
      });
      const req = httpMock.expectOne('/api/admin/api/pages');
      req.flush({ data: { content: 'Mock page content' } });
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(formData);

      httpMock.verify();
    });
  });
});
