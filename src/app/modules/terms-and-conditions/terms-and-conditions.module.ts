import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [CommonModule, TermsAndConditionsRoutingModule, MatCardModule],
})
export class TermsAndConditionsModule {}
