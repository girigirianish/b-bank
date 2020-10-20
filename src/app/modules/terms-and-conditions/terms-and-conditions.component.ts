import { Component, OnInit } from '@angular/core';
import { PagesService } from '../shared/services';

@Component({
  selector: 'blood-bank-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  public termsAndConditionsContent: string;
  constructor(private readonly pagesService: PagesService) {}

  ngOnInit(): void {
    this.fetchPrivacyPolicyContent();
  }

  private async fetchPrivacyPolicyContent(): Promise<void> {
    this.termsAndConditionsContent = await this.pagesService.getPageContent(
      'term-condition'
    );
  }
}
