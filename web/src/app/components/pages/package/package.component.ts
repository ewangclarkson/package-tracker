import {Component, OnInit} from '@angular/core';
import {PackageResponse} from "../../../models/package-response.model";
import {DeliveryResponse} from "../../../models/delivery-response.model";
import {ToastrService} from "ngx-toastr";
import {TranslationService} from "../../../services/translation/translation.service";
import {PackageService} from "../../../services/package/package.service";
import {DeliveryService} from "../../../services/delivery/delivery.service";
import {PackageRequest} from "../../../models/package-request.model";
import {PlaceSearchResult} from "../../../models/place-search-result.model";
import {Location} from "../../../models/location.model";
import {DeliveryRequest} from "../../../models/delivery-request.model";
import {Status} from "../../../constants/status";

@Component({
  selector: 'app-admin',
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent implements OnInit {

  isLoading: boolean = false;

  packageList: PackageResponse[] = [];
  deliveryList: DeliveryResponse[] = [];
  packageRequest: PackageRequest = {
    description: undefined,
    weight: undefined,
    width: undefined,
    height: undefined,
    depth: undefined,
    from_name: '',
    from_address: '',
    from_location: undefined,
    to_name: '',
    to_address: '',
    to_location: undefined
  };
  deliveryRequest: DeliveryRequest = {
    package_id: undefined,
    pickup_time: undefined,
    start_time: undefined,
    end_time: undefined,
    location: undefined,
    status: undefined
  };

  fromLocation?: PlaceSearchResult | undefined;
  toLocation?: PlaceSearchResult | undefined;
  deliveryLocation?: PlaceSearchResult;
  statusOptions: Status[] = [
    Status.OPEN,
    Status.PICKEDUP,
    Status.INTRANSIT,
    Status.DELIVERED,
    Status.FAILED
  ];
  showList: boolean = true;
  showAddPackage: boolean = false;
  showAddDelivery: boolean = false;

  constructor(
    private toastr: ToastrService,
    private translate: TranslationService,
    private packageService: PackageService,
    private deliveryService: DeliveryService,
  ) {
  }


  ngOnInit(): void {
    this.getPackages();
    this.getDeliveries();
  }

  displayDatatable() {
    setTimeout(() => {
      $('#packageDatatable').DataTable({
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu: [5, 10, 25],
      });
      $('#deliveryDatatable').DataTable({
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu: [5, 10, 25],
      });
    }, 2);
  }


  getDeliveries() {
    this.isLoading = true;
    this.deliveryService.getDeliveries().subscribe(
      (response: DeliveryResponse[]) => {
        this.deliveryList = response;
        if (response.length == 0) this.toastr.success(this.translate.getMessage("no_deliveries"));

        if (response.length > 0) this.toastr.success(this.translate.getMessage("deliveries_loaded"));
        this.isLoading = false;
        this.displayDatatable();
      },
      (err) => {
        this.toastr.error(this.translate.getMessage("unexpected_error_d"));
        this.isLoading = false;
      }
    );
  }

  getPackages() {
    this.isLoading = true;
    this.packageService.getPackages().subscribe(
      (response: PackageResponse[]) => {
        this.packageList = response;
        if (response.length == 0) this.toastr.success(this.translate.getMessage("no_packages"));

        if (response.length > 0) this.toastr.success(this.translate.getMessage("packages_loaded"));
        this.isLoading = false;
      },
      (err) => {
        this.toastr.error(this.translate.getMessage("unexpected_error_p"));
        this.isLoading = false;
      }
    );
  }

  isValidPackageRequest() {
    return ((this.packageRequest.description != undefined) && (this.packageRequest.description.length > 0) && (this.packageRequest.weight != undefined)
      && (this.packageRequest.width != undefined) && (this.packageRequest.height != undefined) && (this.packageRequest.depth != undefined)
      && (this.packageRequest.from_name != undefined) && (this.packageRequest.from_name.length > 0) && (this.packageRequest.from_address != undefined)
      && (this.packageRequest.from_address.length > 0) && (this.packageRequest.to_name != undefined) && (this.packageRequest.to_name.length > 0)
      && (this.packageRequest.to_address != undefined) && (this.packageRequest.to_address.length > 0 && this.fromLocation != undefined && this.toLocation != undefined)
    );
  }

  onAddPackage() {
    if (!this.isValidPackageRequest()) {
      this.toastr.error("invalid_package_request");
    }
    this.isLoading = true;
    const source: Location = {lat: this.fromLocation!.location!.lat(), lng: this.fromLocation!.location!.lng()};
    const destination: Location = {lat: this.toLocation!.location!.lat(), lng: this.toLocation!.location!.lng()};
    this.packageService.createPackage({
      ...this.packageRequest,
      from_location: source,
      to_location: destination
    }).subscribe(
      (response: PackageResponse) => {
        this.packageList.push(response);
        this.toastr.success(this.translate.getMessage("package_created"));
        this.packageRequest = {
          description: undefined,
          weight: undefined,
          width: undefined,
          height: undefined,
          depth: undefined,
          from_name: '',
          from_address: '',
          from_location: undefined,
          to_name: '',
          to_address: '',
          to_location: undefined
        };
        this.show(true, false, false);
        this.isLoading = false;
      },
      (err) => {
        this.toastr.error(this.translate.getMessage("unexpected_error_p"));
        this.isLoading = false;
      }
    );
  }

  isValidDeliveryRequest() {
    return ((this.deliveryRequest.package_id != undefined) && (this.deliveryRequest.package_id.length > 0)
      && (this.deliveryRequest.pickup_time != undefined) && (this.deliveryRequest.pickup_time.length > 0 != undefined)
      && (this.deliveryRequest.start_time != undefined) && (this.deliveryRequest.start_time.length > 0 != undefined)
      && (this.deliveryRequest.end_time != undefined) && (this.deliveryRequest.end_time.length > 0 != undefined)
      && (this.deliveryRequest.status != undefined) && (this.deliveryRequest.status.length > 0 != undefined) && (this.deliveryLocation != undefined)
    );
  }


  show(showList: boolean, showAddPackage: boolean, showAddDelivery: boolean) {
    this.showList = showList;
    this.showAddDelivery = showAddDelivery;
    this.showAddPackage = showAddPackage;
    this.showList ? this.displayDatatable() : '';
  }

  onAddDelivery() {
    if (!this.isValidDeliveryRequest()) {
      this.toastr.error("invalid_delivery_request");
    }
    this.isLoading = true;
    const destination: Location = {
      lat: this.deliveryLocation!.location!.lat(),
      lng: this.deliveryLocation!.location!.lng()
    };
    this.deliveryService.createDelivery({
      ...this.deliveryRequest, location: destination
    }).subscribe(
      (response: DeliveryResponse) => {
        this.deliveryList.push(response);
        this.toastr.success(this.translate.getMessage("delivery_created"));
        this.deliveryRequest = {
          package_id: undefined,
          pickup_time: undefined,
          start_time: undefined,
          end_time: undefined,
          location: undefined,
          status: undefined
        };
        this.show(true, false, false);
        this.isLoading = false;
      },
      (err) => {
        this.toastr.error(this.translate.getMessage("unexpected_error_p"));
        this.isLoading = false;
      }
    );
  }

}
