import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [CommonModule, PrivacyPolicyRoutingModule, MatCardModule],
})
export class PrivacyPolicyModule {}
