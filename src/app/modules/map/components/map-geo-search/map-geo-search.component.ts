import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import * as L from 'leaflet';
import * as esriGeo from 'esri-leaflet-geocoder';
import * as esri from 'esri-leaflet';
import { MarkerDetails } from '../map/map.component';

@Component({
  selector: 'map-geo-search',
  templateUrl: 'map-geo-search.component.html',
  styleUrls: ['map-geo-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapGeoSearchComponent implements AfterViewInit {
  @Output()
  public readonly locationSelected: EventEmitter<
    MarkerDetails
  > = new EventEmitter<MarkerDetails>();
  public ngAfterViewInit(): void {
    this.prepareGeoCoderMapView();
  }

  // 26.4831 to 29.84121 and longitude from 80.33333 to 88.09436.
  private prepareGeoCoderMapView(): void {
    const map = L.map('map').setView([26.48314666748047, 88.0942153930664], 12);
    esri.basemapLayer('Streets').addTo(map);
    const searchControl = esriGeo.geosearch().addTo(map);
    const results = L.layerGroup().addTo(map);
    searchControl.on('results', (data) => {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(
          L.marker(data.results[i].latlng).on(
            'click',
            this.onMarkerClick.bind(this, data.results[i].text)
          )
        );
      }
    });
  }

  public onMarkerClick(label: string, event): void {
    this.locationSelected.next({
      lat: event.latlng.lat,
      long: event.latlng.lng,
      label,
    });
  }
}
