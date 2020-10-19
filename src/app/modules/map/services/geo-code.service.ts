import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeoCodeService {
  constructor(private readonly http: HttpClient) {}

  public geocode(address: string): Observable<any> {
    const geocode =
      'http://nominatim.openstreetmap.org/search?format=json&q=' + address;
    return this.http
      .get(geocode)
      .pipe(map((searchResponse) => searchResponse[0]));
  }
}
