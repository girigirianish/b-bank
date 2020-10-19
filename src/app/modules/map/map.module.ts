import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent, MapGeoSearchComponent } from './components/';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [MapComponent, MapGeoSearchComponent],
  imports: [CommonModule, LeafletModule],
  exports: [MapComponent, MapGeoSearchComponent],
  entryComponents: [MapComponent, MapGeoSearchComponent],
})
export class MapModule {}
