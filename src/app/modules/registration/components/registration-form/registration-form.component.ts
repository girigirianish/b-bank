import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public readonly districtSearchBox: SearchSelectBoxModel[] = DISTRICT_SELECT_BOX_ITEMS;
  public readonly bloodGroupSeachBox: SearchSelectBoxModel[] = BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS;
  public registrationForm: FormGroup;

  @Output()
  public readonly registrationDetailsSubmitted = new EventEmitter<
    RegistrationDetails
  >();

  public ngOnInit(): void {
    this.prepareRegistrationForm();
  }

  private prepareRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      bloodGroup: new FormControl('', [Validators.required]),
    });
  }

  public register(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    this.registrationDetailsSubmitted.next(this.registrationForm.value);
  }
}
