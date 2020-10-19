import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchAuthHeaderInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem('searchToken');

    if (!token || !this.isSmsAndEmailEndpoint(request.url)) {
      return next.handle(request);
    }

    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return next.handle(newRequest);
  }

  private isSmsAndEmailEndpoint(url: string): boolean {
    return (
      url.includes('/api/sms-to/donor') || url.includes('/api/email-to/donor')
    );
  }
}
