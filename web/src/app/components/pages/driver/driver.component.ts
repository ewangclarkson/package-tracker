import {Component, OnInit} from '@angular/core';
import {PackageResponse} from "../../../models/package-response.model";
import {DeliveryResponse} from "../../../models/delivery-response.model";
import {ToastrService} from "ngx-toastr";
import {TranslationService} from "../../../services/translation/translation.service";
import {PackageService} from "../../../services/package/package.service";
import {DeliveryService} from "../../../services/delivery/delivery.service";
import {WebsocketService} from "../../../services/socket/websocket.service";
import {Events} from "../../../constants/events";
import {Status} from "../../../constants/status";
import {StorageService} from "../../../services/storage/local/storage.service";

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit {
  show: any;
  showMap = false;
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
  status: any = {
    OPEN: Status.OPEN,
    PICKEDUP: Status.PICKEDUP,
    INTRANSIT: Status.INTRANSIT,
    DELIVERED: Status.DELIVERED,
    FAILED: Status.FAILED
  };


  constructor(
    private toastr: ToastrService,
    private translate: TranslationService,
    private packageService: PackageService,
    private deliveryService: DeliveryService,
    private webSocketService: WebsocketService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {

  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.show = event.latLng.toJSON();
  }


  onSubmit() {
    if (this.mobileSearchValue.length == 0) this.toastr.error(this.translate.getMessage("invalid_package"));

    this.isLoading = true;
    this.markerPositions = [];
    this.deliveryService.getDelivery(this.mobileSearchValue).subscribe(
      (response: DeliveryResponse) => {
        if (response.package_id.length > 0) {
          this.packageService.getPackage(response.package_id)
            .subscribe(
              (resp: PackageResponse) => {
                this.packageResponse = resp;
                this.deliveryResponse = response;
                this.defineMapMarkers(resp.from_location.lat, resp.from_location.lng);
                this.defineMapMarkers(resp.to_location.lat, resp.to_location.lng);
                this.defineMapOptions();
                this.toastr.success(this.translate.getMessage("delivery_load_success"));
              },
              (er) => {
                this.toastr.error(this.translate.getMessage("no_package"));
              }
            )
        }
        this.isLoading = false;
      },
      (err) => {
        this.toastr.error(this.translate.getMessage("invalid_delivery"));
        this.isLoading = false;
      }
    );
  }

  defineMapMarkers(latitude: number, longitude: number) {
    this.markerPositions.push({lat: latitude, lng: longitude});
  }


  setCurrentMapInformation() {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      if ((latitude == this.center.lat) && (longitude == this.center.lng)) {
      } else {
        if (this.center.lat !== 0 && this.center.lng !== 0) {
          this.webSocketService.sendMessage(Events.LOCATION_CHANGE, {
            delivery_id: this.deliveryResponse!.delivery_id,
            location: {lat: latitude, lng: longitude}
          });
        }
      }
      this.center.lat = latitude;
      this.center.lng = longitude;
      this.markerPositions.length ==3?this.markerPositions.pop():'';
      this.markerPositions.push({lat: latitude, lng: longitude});
      this.showMap = true;
    });
  }


  defineMapOptions() {
    this.setCurrentMapInformation();
    const number = setInterval(() => {
      this.setCurrentMapInformation();
    }, 20000);
  }

  changeState(status: Status) {
    this.webSocketService.sendMessage(Events.STATUS_CHANGE, {
      delivery_id: this.deliveryResponse!.delivery_id,
      status: status
    });
    this.deliveryService.getDelivery(this.mobileSearchValue).subscribe(
      (response: DeliveryResponse) => {
        this.deliveryResponse = response;
      }
    );
  }

}
