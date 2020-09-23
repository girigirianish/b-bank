import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {
  icon,
  latLng,
  marker,
  tileLayer,
  Marker,
  TileLayer,
  Map,
  MapOptions,
  Layer,
} from 'leaflet';

export interface MarkerDetails {
  lat: number;
  long: number;
  label?: string;
}

@Component({
  selector: 'blood-bank-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input()
  public set markerDetails(newMarkerDetails: MarkerDetails[]) {
    if (newMarkerDetails) {
      this.prepareOptions(newMarkerDetails);
    }
  }

  private readonly streetMaps = tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      detectRetina: true,
      attribution:
        '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors',
    }
  );
  private readonly wMaps = tileLayer(
    'http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    {
      detectRetina: true,
      attribution:
        '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors',
    }
  );

  // Layers control object with our two base layers and the three overlay layers
  public readonly layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps,
    },
  };

  public options: MapOptions = {
    layers: [this.streetMaps],
    zoom: 7,
    center: latLng([27.700769, 85.30014]),
  };

  public layers: Layer[];

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  private prepareOptions(newMarkerDetails: MarkerDetails[]): void {
    this.layers = this.prepareLayers(newMarkerDetails);
  }

  private prepareLayers(
    markerDetails: MarkerDetails[]
  ): (TileLayer | Marker<any>)[] {
    return markerDetails.map((markerDetail) =>
      this.getMarker(markerDetail.lat, markerDetail.long)
    );
  }

  private getMarker(lat: number, long: number): Marker<any> {
    return marker([lat, long], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
      }),
    });
  }
}
