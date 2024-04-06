import {Component} from '@angular/core';
import {PackageResponse} from "../../../models/package-response.model";
import {ToastrService} from "ngx-toastr";
import {TranslationService} from "../../../services/translation/translation.service";
import {PackageService} from "../../../services/package/package.service";
import {DeliveryService} from "../../../services/delivery/delivery.service";
import {LoginResponse} from "../../../models/login-response.model";
import {DeliveryResponse} from "../../../models/delivery-response.model";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {WebsocketService} from "../../../services/socket/websocket.service";
import {environment} from "../../../../environments/environment";
import {Status} from "../../../constants/status";
import {Events} from "../../../constants/events";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  display: any;
  displayMap = false;
  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };
  zoom = 2;
  mobileSearchValue: string = '';
  isLoading: boolean = false;

  packageResponse?: PackageResponse;
  deliveryResponse?: DeliveryResponse;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  // addMarker(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) {
  //     console.log(event.latLng);
  //     this.markerPositions.push(event.latLng.toJSON())
  //   }
  //   ;
  // }


  constructor(
    private toastr: ToastrService,
    private translate: TranslationService,
    private packageService: PackageService,
    private deliveryService: DeliveryService,
  ) {
  }

  ngOnInit(): void {

  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }


  onTrack() {
    if (this.mobileSearchValue.length == 0) this.toastr.error(this.translate.getMessage("invalid_package"));

    this.isLoading = true;
    this.markerPositions=[];
    this.packageService.getPackage(this.mobileSearchValue).subscribe(
      (response: PackageResponse) => {
        if (response.active_delivery_id.length > 0) {
          this.deliveryService.getDelivery(response.active_delivery_id)
            .subscribe(
              (resp: DeliveryResponse) => {
                this.packageResponse = response;
                this.deliveryResponse = resp;
                this.setMarkerPosition(response.from_location.lat, response.from_location.lng);
                this.setMarkerPosition(response.to_location.lat, response.to_location.lng);
                this.setMapCurrentPositions();


                this.toastr.success(this.translate.getMessage("package_load_success"));
              },
              (er) => {
                this.toastr.error(this.translate.getMessage("no_delivery"));
              }
            )
        }
        this.isLoading = false;
      },
      (err) => {
        this.toastr.error(this.translate.getMessage("invalid_package"));
        this.isLoading = false;
      }
    );
  }

  setMarkerPosition(latitude: number, longitude: number) {
    this.markerPositions.push({lat: latitude, lng: longitude});
  }

  setMapCurrentPositions() {
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        this.center.lat = latitude;
        this.center.lng = longitude;
        this.markerPositions.push({lat: latitude, lng: longitude});
        this.displayMap = true;
      });
    }, 100);
  }
}
