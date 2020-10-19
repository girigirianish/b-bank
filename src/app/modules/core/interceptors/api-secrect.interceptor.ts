import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiSecretInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.body && req.body.append) {
      req.body.append(
        'api_secret',
        'zcGEKg4kLpteoVv+fzJ+0jsFGfJavu6z1UWqwkmg='
      );
    }
    return next.handle(req);
  }
}
