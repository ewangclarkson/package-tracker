import {Component} from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  display: any;
  displayMap = false;
  center: google.maps.LatLngLiteral={
    lat: 0,
    lng: 0
  };
  zoom = 20;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null)  {console.log(event.latLng);this.markerPositions.push(event.latLng.toJSON())};
  }


  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        this.center.lat = latitude;
        this.center.lng = longitude;
        this.markerPositions.push({lat:latitude,lng:longitude});
        this.displayMap=true;
      });
    }, 100);
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
