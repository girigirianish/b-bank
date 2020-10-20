import { Component, OnInit } from '@angular/core';
import { ContactDetails } from './models';
import { ContactService } from './services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { PagesService } from '../shared/services';

@Component({
  selector: 'blood-bank-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  public aboutUsContent: string;
  constructor(
    private readonly contactService: ContactService,
    private readonly pagesServce: PagesService,
    private readonly toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchContactDetails();
  }

  private async fetchContactDetails(): Promise<void> {
    this.aboutUsContent = await this.pagesServce.getPageContent('about-us');
  }

  public async contactDetailsSubmitted(
    contactDetails: ContactDetails
  ): Promise<void> {
    try {
      const contactSend = await this.contactService.sendContactDetails(
        contactDetails
      );

      if (contactSend) {
        this.toast.success('Your query is successfully send');
        return;
      }

      this.toast.error('We are working on it. Please try again later');
    } catch (_) {
      this.toast.error('We are working on it. Please try again later');
    }
  }
}
