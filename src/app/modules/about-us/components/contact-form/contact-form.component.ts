import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactDetails } from '../../models';

@Component({
  selector: 'blood-bank-contact-form',
  templateUrl: 'contact-form.component.html',
  styleUrls: ['contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  public contactForm: FormGroup;

  @Output()
  public readonly contactDetailsSubmitted = new EventEmitter<ContactDetails>();

  public ngOnInit(): void {
    this.prepareRegistrationForm();
  }

  private prepareRegistrationForm(): void {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }
  public sendQueryInformation(): void {
    if (this.contactForm.invalid) {
      return;
    }
    this.contactDetailsSubmitted.next(this.contactForm.value);
  }
}
