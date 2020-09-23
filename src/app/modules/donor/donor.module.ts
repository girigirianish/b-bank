import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorListComponent } from './components';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [DonorListComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  exports: [DonorListComponent],
})
export class DonorModule {}
