import {Component} from '@angular/core';
import {PackageResponse} from "../../../models/package-response.model";
import {ToastrService} from "ngx-toastr";
import {TranslationService} from "../../../services/translation/translation.service";
import {PackageService} from "../../../services/package/package.service";
import {DeliveryService} from "../../../services/delivery/delivery.service";
import {DeliveryResponse} from "../../../models/delivery-response.model";
import {WebsocketService} from "../../../services/socket/websocket.service";
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


  constructor(
    private toastr: ToastrService,
    private translate: TranslationService,
    private packageService: PackageService,
    private deliveryService: DeliveryService,
    private webSocketService: WebsocketService
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
    this.markerPositions = [];
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
                this.setMapCurrentPositions(resp.location.lat,resp.location.lng);
                this.webSocketService.getMessage(Events.DELIVERY_UPDATED)
                  .subscribe((delivery: DeliveryResponse) => {

                    if (delivery.delivery_id == this.deliveryResponse!.delivery_id) {
                      this.deliveryResponse = delivery!;
                      this.markerPositions.pop();
                      this.setMapCurrentPositions(delivery.location.lat,delivery.location.lng);
                    }
                  });

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

  setMapCurrentPositions(latitude:number,longitude:number) {
    this.center.lat = latitude;
    this.center.lng = longitude;
    this.markerPositions.push({lat: latitude, lng: longitude});
    this.displayMap = true;
  }
}
