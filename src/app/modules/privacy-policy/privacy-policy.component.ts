import { Component, OnInit } from '@angular/core';
import { PagesService } from '../shared/services';

@Component({
  selector: 'blood-bank-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  public privacyPolicyContent: string;
  constructor(private readonly pagesService: PagesService) {}

  ngOnInit(): void {
    this.fetchPrivacyPolicyContent();
  }

  private async fetchPrivacyPolicyContent(): Promise<void> {
    this.privacyPolicyContent = await this.pagesService.getPageContent(
      'privacy-policy'
    );
  }
}
