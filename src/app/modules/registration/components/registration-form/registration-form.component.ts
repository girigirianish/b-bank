import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
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
  public yesterday = new Date();

  @Output()
  public readonly registrationDetailsSubmitted = new EventEmitter<
    RegistrationDetails
  >();

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

  public register(formDirective: FormGroupDirective): void {
    if (this.registrationForm.invalid) {
      return;
    }
    this.registrationDetailsSubmitted.next(this.registrationForm.value);
    setTimeout(() => formDirective.resetForm(), 200);
    this.registrationForm.reset();
  }
}
