import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS,
  SearchSelectBoxModel,
} from 'src/app/modules/search-models';
import { DonerSearchQuery } from '../../services';

@Component({
  selector: 'search-donor-form',
  templateUrl: 'search-donor-form.component.html',
  styleUrls: ['search-donor-form.component.scss'],
})
export class SearchDonorFormComponent implements OnInit {
  @Input()
  public bloodGroupSeachBox: SearchSelectBoxModel[] = BLOOD_GROUP_TYPE_SELECT_BOX_ITEMS;
  public searchDonerForm: FormGroup;

  @Output()
  public readonly donerSearchSubmitted = new EventEmitter<DonerSearchQuery>();

  public ngOnInit(): void {
    this.prepareSearchDonerForm();
  }

  private prepareSearchDonerForm(): void {
    this.searchDonerForm = new FormGroup({
      bloodGroup: new FormControl('', [Validators.required]),
      bloodSeekerName: new FormControl('', [Validators.required]),
      donorAddress: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required]),
    });
  }

  public searchDoner(formDirective: FormGroupDirective): void {
    if (this.searchDonerForm.invalid) {
      return;
    }
    this.donerSearchSubmitted.next(this.searchDonerForm.value);
    setTimeout(() => formDirective.resetForm(), 200);
    this.searchDonerForm.reset();
  }
}
