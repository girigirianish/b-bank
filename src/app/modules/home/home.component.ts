import { Component, OnInit } from '@angular/core';
import { DonerSearchQuery, DonorService } from '../donor/services';
import { DonorsInformation } from '../donor/models';
import { MarkerDetails } from '../map/components/map/map.component';
import {
  DISTRICT_SELECT_BOX_ITEMS,
  SearchSelectBoxModel,
  BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS,
} from '../search-models';
import { BloodGroupService } from '../shared/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'blood-bank-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public donorsFilteredList: DonorsInformation[];
  public markerDetails: MarkerDetails[] = [];
  public readonly districtSearchBox: SearchSelectBoxModel[] = DISTRICT_SELECT_BOX_ITEMS;
  public bloodGroupSeachBox: SearchSelectBoxModel[] = BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS;
  public selectedDistrict: string;
  public selectedBloodGroupType: string;

  constructor(
    private readonly donerService: DonorService,
    private readonly bloodGroupService: BloodGroupService,
    private readonly toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.prepareBloodGroupSelectBox();
  }

  private prepareMarkerDetails(): void {
    this.markerDetails = this.donorsFilteredList
      .map((donor) => {
        if (donor.lat && donor.lng) {
          return {
            lat: donor.lat,
            long: donor.lng,
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  private async prepareBloodGroupSelectBox(): Promise<void> {
    const bloodGroups = await this.bloodGroupService.getBloodGroups();
    this.bloodGroupSeachBox = Object.values(bloodGroups).map((bg) => {
      return { value: bg, viewValue: bg };
    });
  }

  public async donerSearchSubmitted(
    searchQuery: DonerSearchQuery
  ): Promise<void> {
    try {
      const searchResponse = await this.donerService.searchDoner(searchQuery);
      this.donorsFilteredList = searchResponse;
      if (!this.donorsFilteredList.length) {
        this.toast.info('Sorry,no results found for you query.');
        return;
      }
      this.prepareMarkerDetails();
    } catch (_) {
      this.toast.error(
        'Something went wrong! Please try again after some time'
      );
    }
  }

  public async sendSmsClicked(id: number): Promise<void> {
    try {
      await this.donerService.sendSmsToDoner(id);
      this.toast.success('A sms was send successfully.');
    } catch (_) {
      this.toast.error(
        'Something went wrong! Please try again after some time'
      );
    }
  }

  public async sendEmailClicked(id: number): Promise<void> {
    try {
      await this.donerService.sendEmailToDoner(id);
      this.toast.success('An email was send successfully.');
    } catch (_) {
      this.toast.error(
        'Something went wrong! Please try again after some time'
      );
    }
  }

  public async sendBulkSmsClicked(ids: number[]): Promise<void> {
    const smsPromises = ids.map((id) => {
      return this.donerService.sendSmsToDoner(id);
    });

    await Promise.all(smsPromises);
  }

  public async sendBulkEmailClicked(ids: number[]): Promise<void> {
    const smsPromises = ids.map((id) => {
      return this.donerService.sendEmailToDoner(id);
    });

    await Promise.all(smsPromises);
  }
}
