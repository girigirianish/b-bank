import { Component, OnInit } from '@angular/core';
import { ContactDetails } from './models';
import { ContactService } from './services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'blood-bank-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  constructor(
    private readonly contactService: ContactService,
    private readonly toast: ToastrService
  ) {}

  ngOnInit(): void {}

  public async contactDetailsSubmitted(
    contactDetails: ContactDetails
  ): Promise<void> {
    try {
      const contactSend = await this.contactService.sendContactDetails(
        contactDetails
      );

      if (contactSend) {
        this.toast.success('You query is successfully send');
        return;
      }

      this.toast.success('We are working on it. Please try again later');
    } catch (_) {
      this.toast.success('We are working on it. Please try again later');
    }
  }
}
