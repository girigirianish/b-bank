import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationDetails } from './models';
import { RegistrationService } from '../registration/services';
import { ToastrService } from 'ngx-toastr';
import { RegistrationFormComponent } from './components';

@Component({
  selector: 'blood-bank-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  @ViewChild(RegistrationFormComponent, {
    static: false,
    read: RegistrationFormComponent,
  })
  public registerForm: RegistrationFormComponent;
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly toast: ToastrService
  ) {}

  ngOnInit(): void {}

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
    } catch (_) {
      this.toast.error('We are working on it. Please try again later');
    }
  }
}
