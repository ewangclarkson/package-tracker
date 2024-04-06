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

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        this.center.lat = latitude;
        this.center.lng = longitude;
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
