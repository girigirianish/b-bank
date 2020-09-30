import { Component, OnInit } from '@angular/core';
import { DonorService } from '../donor/services';
import { DonorsInformation } from '../donor/models';
import { MarkerDetails } from '../map/components/map/map.component';
import {
  DISTRICT_SELECT_BOX_ITEMS,
  SearchSelectBoxModel,
  BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS,
} from '../search-models';

@Component({
  selector: 'blood-bank-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private donorsInformation: DonorsInformation[];
  public donorsFilteredList: DonorsInformation[];
  public markerDetails: MarkerDetails[] = [];
  public readonly districtSearchBox: SearchSelectBoxModel[] = DISTRICT_SELECT_BOX_ITEMS;
  public readonly bloodGroupSeachBox: SearchSelectBoxModel[] = BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS;
  public selectedDistrict: string;
  public selectedBloodGroupType: string;

  constructor(private readonly donerService: DonorService) {}

  ngOnInit(): void {
    this.setDonerInformation();
  }

  private async setDonerInformation(): Promise<void> {
    this.donorsInformation = await this.donerService.getDonersInformations();
    this.donorsFilteredList = this.donorsInformation;
    this.prepareMarkerDetails();
  }

  private prepareMarkerDetails(): void {
    this.markerDetails = this.donorsFilteredList.map((donerInformation) => {
      return {
        lat: donerInformation.lat,
        long: donerInformation.long,
      };
    });
  }

  public filterDonersData(): void {
    if (!this.selectedDistrict && !this.selectedBloodGroupType) {
      return;
    }
    this.donorsFilteredList = this.donorsInformation.filter((donerInfo) => {
      if (this.selectedDistrict && this.selectedBloodGroupType) {
        return (
          donerInfo.bloodGroup === this.selectedBloodGroupType &&
          donerInfo.district === this.selectedDistrict
        );
      }
      if (this.selectedDistrict) {
        return donerInfo.district === this.selectedDistrict;
      }

      if (this.selectedBloodGroupType) {
        return donerInfo.bloodGroup === this.selectedBloodGroupType;
      }
    });
    this.prepareMarkerDetails();
  }

  public resetToInitailView(): void {
    this.donorsFilteredList = this.donorsInformation;
    this.prepareMarkerDetails();
    this.selectedDistrict = null;
    this.selectedBloodGroupType = null;
  }
}
