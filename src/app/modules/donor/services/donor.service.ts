import { Injectable } from '@angular/core';
import { DonorsInformation } from '../models';
import { DONORS_DATA } from './doner-information';

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  constructor() {}

  public async getDonersInformations(): Promise<DonorsInformation[]> {
    return DONORS_DATA;
  }
}
