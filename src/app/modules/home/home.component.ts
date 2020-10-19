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
import { GeoCodeService } from '../map/services';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, reduce, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
  public bloodGroupSeachBox: SearchSelectBoxModel[] = BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS;
  public selectedDistrict: string;
  public selectedBloodGroupType: string;

  constructor(
    private readonly donerService: DonorService,
    private readonly bloodGroupService: BloodGroupService,
    private readonly geocodeService: GeoCodeService,
    private readonly toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.setDonerInformation();
    this.prepareBloodGroupSelectBox();
  }

  private async setDonerInformation(): Promise<void> {
    this.donorsInformation = (
      await this.donerService.getDonersInformations()
    ).data;
    console.log(this.donorsInformation, 'donerInformation');
    this.donorsFilteredList = this.donorsInformation;
    this.prepareMarkerDetails().subscribe(
      (markersDetails) => (this.markerDetails = markersDetails)
    );
  }

  private prepareMarkerDetails(): Observable<any> {
    let donerInfo;
    return from(this.donorsFilteredList).pipe(
      mergeMap((donerInformation) => {
        donerInfo = donerInformation;
        return this.geocodeService.geocode(donerInformation.temporary_address);
      }, 2),
      switchMap((geocode) => {
        if (!geocode) {
          return this.geocodeService.geocode(donerInfo.permanent_address).pipe(
            map((getdata) => {
              if (geocode) {
                return of({
                  lat: geocode.lat,
                  long: geocode.long,
                });
              }
              return of(null);
            })
          );
        }
        if (geocode) {
          return of({
            lat: geocode.lat,
            long: geocode.lon,
          });
        }
        return of(null);
      }),
      reduce((a, i) => [...a, i], [])
    );
  }

  public filterDonersData(): void {
    if (!this.selectedDistrict && !this.selectedBloodGroupType) {
      return;
    }

    this.donorsFilteredList = this.donorsInformation.filter((donerInfo) => {
      if (this.selectedDistrict && this.selectedBloodGroupType) {
        return (
          donerInfo.blood_group === this.selectedBloodGroupType &&
          donerInfo.district === this.selectedDistrict
        );
      }
      if (this.selectedDistrict) {
        return donerInfo.district === this.selectedDistrict;
      }

      if (this.selectedBloodGroupType) {
        return donerInfo.blood_group === this.selectedBloodGroupType;
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
      console.log(searchResponse, 'resposne');
    } catch (_) {
      this.toast.error(
        'Something went wrong! Please try again after some time'
      );
    }
  }
}
