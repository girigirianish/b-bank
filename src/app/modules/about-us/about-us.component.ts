import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactDetails } from './models';
import { ContactService } from './services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { PagesService } from '../shared/services';
import { ContactFormComponent } from './components';

@Component({
  selector: 'blood-bank-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  @ViewChild(ContactFormComponent, {
    static: false,
    read: ContactFormComponent,
})
public contactForm: ContactFormComponent;
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
        this.contactForm.resetForm();
        return;
      }

      this.toast.error('We are working on it. Please try again later');
    } catch (_) {
      this.toast.error('We are working on it. Please try again later');
    }
  }
}
