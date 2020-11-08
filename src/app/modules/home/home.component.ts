import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public donorsFilteredList: DonorsInformation[] = [];
  public markerDetails: MarkerDetails[] = [];
  public readonly districtSearchBox: SearchSelectBoxModel[] = DISTRICT_SELECT_BOX_ITEMS;
  public bloodGroupSeachBox: SearchSelectBoxModel[] = BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS;
  public selectedDistrict: string;
  public selectedBloodGroupType: string;
  public selectedView = 'table';
  public searched = false;

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
      this.searched = true;
      const searchResponse = await this.donerService.searchDoner(searchQuery);
      this.donorsFilteredList = searchResponse;
      if (!this.donorsFilteredList.length) {
        this.toast.info('Sorry,no results found for you query.');
        return;
      }
      this.prepareMarkerDetails();
    } catch (e) {
      if (e.error) {
        const errors = Object.values(e.error);
        if (errors.length && Array.isArray(errors[0])) {
          this.toast.error(errors[0][0]);
          return;
        }
      }
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
    try {
      const smsPromises = ids.map((id) => {
        return this.donerService.sendSmsToDoner(id);
      });

      await Promise.all(smsPromises);
      this.toast.success('Sms were sent successfully.');
    } catch (_) {
      this.toast.error(
        'Something went wrong! Please try again after some time'
      );
    }
  }

  public async sendBulkEmailClicked(ids: number[]): Promise<void> {
    try {
      const smsPromises = ids.map((id) => {
        return this.donerService.sendEmailToDoner(id);
      });

      await Promise.all(smsPromises);
      this.toast.success('Emails were sent successfully.');
    } catch (_) {
      this.toast.error(
        'Something went wrong! Please try again after some time'
      );
    }
  }

  public viewChanged(changedView): void {
    this.selectedView = changedView.value;
  }
}
