import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationDetails } from './models';
import { RegistrationService } from '../registration/services';
import { ToastrService } from 'ngx-toastr';
import { RegistrationFormComponent } from './components';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'blood-bank-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  @ViewChild(RegistrationFormComponent, {
    static: false,
    read: RegistrationFormComponent,
  })
  public registerForm: RegistrationFormComponent;
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly toast: ToastrService
  ) {}

  public async registrationDetailsSubmitted(
    registrationDetails: RegistrationDetails
  ): Promise<void> {
    try {
      const registeredStatus = await this.registrationService.register(
        registrationDetails
      );
      if (registeredStatus) {
        this.toast.success('You are successfully registered');
        this.registerForm.resetForm();
      }
    } catch (e) {
      if (e.error) {
        const errors = Object.values(e.error);
        if (errors.length && Array.isArray(errors[0])) {
          this.toast.error(errors[0][0]);
          return;
        }
      }

      this.toast.error('We are working on it. Please try again later');
    }
  }
}
