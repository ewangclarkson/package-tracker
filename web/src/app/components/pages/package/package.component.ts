import {Component, OnInit} from '@angular/core';
import {PackageResponse} from "../../../models/package-response.model";
import {DeliveryResponse} from "../../../models/delivery-response.model";
import {ToastrService} from "ngx-toastr";
import {TranslationService} from "../../../services/translation/translation.service";
import {PackageService} from "../../../services/package/package.service";
import {DeliveryService} from "../../../services/delivery/delivery.service";
import {WebsocketService} from "../../../services/socket/websocket.service";
import {StorageService} from "../../../services/storage/local/storage.service";

@Component({
  selector: 'app-admin',
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent implements OnInit {

  isLoading: boolean = false;

  packageList: PackageResponse[] = [];
  deliveryList: DeliveryResponse[] = [];

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
    setTimeout(()=>{
      $('#packageDatatable').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu : [5, 10, 25],
      } );
      $('#deliveryDatatable').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu : [5, 10, 25],
      } );
    }, 1);
  }


  getDeliveries() {
    this.isLoading = true;
    this.deliveryService.getDeliveries().subscribe(
      (response: DeliveryResponse[]) => {
        this.deliveryList = response;
        if (response.length == 0) this.toastr.success(this.translate.getMessage("no_deliveries"));

        if (response.length > 0) this.toastr.success(this.translate.getMessage("deliveries_loaded"));
        this.isLoading = false;
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

}
