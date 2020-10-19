import { NgForOf } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MapGeoSearchComponent } from 'src/app/modules/map/components';
import { MarkerDetails } from 'src/app/modules/map/components/map/map.component';
import {
  BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS,
  DISTRICT_SELECT_BOX_ITEMS,
  SearchSelectBoxModel,
} from '../../../search-models';
import { RegistrationDetails } from '../../models';

@Component({
  selector: 'blood-bank-registration-form',
  templateUrl: 'registration-form.component.html',
  styleUrls: ['registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  @ViewChild('formDirective') registerForm: NgForm;

  public readonly districtSearchBox: SearchSelectBoxModel[] = DISTRICT_SELECT_BOX_ITEMS;
  public readonly bloodGroupSeachBox: SearchSelectBoxModel[] = BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS;
  public registrationForm: FormGroup;
  public yesterday = new Date();
  private permanentAddress: MarkerDetails;
  private temporaryAddress: MarkerDetails;

  @Output()
  public readonly registrationDetailsSubmitted = new EventEmitter<
    RegistrationDetails
  >();

  constructor(private readonly dialog: MatDialog) {}

  public ngOnInit(): void {
    this.prepareRegistrationForm();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  private prepareRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      temporaryAddress: new FormControl('', [Validators.required]),
      permanentAddress: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      bloodGroup: new FormControl('', [Validators.required]),
      lastDonated: new FormControl('', []),
    });
  }

  public register(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    this.registrationDetailsSubmitted.next({
      ...this.registrationForm.getRawValue(),
      lat: this.temporaryAddress.lat,
      lng: this.temporaryAddress.long,
    });
  }

  public resetForm(): void {
    setTimeout(() => this.registerForm.resetForm(), 200);
    this.registrationForm.reset();
  }

  public openMap(context: string): void {
    const addressSelector = this.dialog.open(MapGeoSearchComponent, {
      width: '1000px',
    });

    addressSelector.componentInstance.locationSelected.subscribe(
      (markerDetails: MarkerDetails) => {
        if (context === 'permanent') {
          this.registrationForm
            .get('permanentAddress')
            .setValue(markerDetails.label);
          this.permanentAddress = markerDetails;
        } else {
          this.registrationForm
            .get('temporaryAddress')
            .setValue(markerDetails.label);
          this.temporaryAddress = markerDetails;
        }
        addressSelector.close();
      }
    );
  }
}
