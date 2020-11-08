import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapModule } from '../map';
import { DonorModule } from '../donor';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MapModule,
    DonorModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    ToastrModule,
    MatButtonToggleModule,
  ],
  providers: [],
})
export class HomeModule {}
