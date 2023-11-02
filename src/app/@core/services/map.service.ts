import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map | undefined; // Cambiamos null por undefined
  style = `mapbox://styles/mapbox/streets-v11`;
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = -33.432902;
  lng = -70.615135;
  zoom = 17;

  constructor() {
    // Asignamos el token desde las variables de entorno
    // this.mapbox.accessToken = environment.mapBoxToken;
    this.mapbox.accessToken =
      'pk.eyJ1IjoiY29qb2R1b2MiLCJhIjoiY2xvYXVycHB1MG5raTJzcWZkdjZjaHY0OSJ9.6-4t5UtTLKh2iHxVeUqeiQ';
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: { lon: -122.420679, lat: 37.772537 },
          },
          properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: { lon: -33.432902, lat: -70.615135 },
          },
          properties: {
            title: 'Mapbox',
            description: 'San Francisco, California',
          },
        },
      ],
    };

    // add markers to map
    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marcador';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .addTo(this.map);
    }
  }
}
