import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit {
  display: any;
  center: google.maps.LatLngLiteral={
    lat:10,
    lng:20
  };
  zoom = 6;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        this.center.lat = latitude;
        this.center.lng = longitude;
      });
    }, 10000);
  }

}
