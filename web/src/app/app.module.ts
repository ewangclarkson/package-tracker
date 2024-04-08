import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {ToastrModule} from "ngx-toastr";
import {DriverComponent} from "./components/pages/driver/driver.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {CustomerComponent} from "./components/pages/customer/customer.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorComponent} from "./components/pages/error/error.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "./guards/auth/auth.guard";
import {DriverGuard} from "./guards/driver/driver.guard";
import {AdminGuard} from "./guards/admin/admin.guard";
import {HeaderComponent} from "./components/header/header.component";
import {GoogleMapsModule} from "@angular/google-maps";
import {SearchComponent} from "./components/search/search.component";
import {environment} from "../environments/environment";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {PackageComponent} from "./components/pages/package/package.component";
import {DeliveryComponent} from "./components/pages/delivery/delivery.component";
import {DataTablesModule} from "angular-datatables";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {PlaceAutocompleteComponent} from "./components/place-autocomplete/place-autocomplete.component";


const config: SocketIoConfig = {url: environment.wsHost, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    PackageComponent,
    DeliveryComponent,
    LoginComponent,
    CustomerComponent,
    HeaderComponent,
    ErrorComponent,
    SearchComponent,
    PlaceAutocompleteComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    GoogleMapsModule,
    SocketIoModule.forRoot(config),
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    DriverGuard,
    AdminGuard,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
