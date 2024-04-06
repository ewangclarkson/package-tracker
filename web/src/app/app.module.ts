import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {ToastrModule} from "ngx-toastr";
import {DriverComponent} from "./components/pages/driver/driver.component";
import {AdminComponent} from "./components/pages/admin/admin.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {CustomerComponent} from "./components/pages/customer/customer.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ErrorComponent} from "./components/pages/error/error/error.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "./guards/auth/auth.guard";
import {DriverGuard} from "./guards/driver/driver.guard";
import {AdminGuard} from "./guards/admin/admin.guard";
import {HeaderComponent} from "./components/header/header.component";
import {GoogleMapsModule} from "@angular/google-maps";
import {SearchComponent} from "./components/search/search.component";

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    AdminComponent,
    LoginComponent,
    CustomerComponent,
    HeaderComponent,
    ErrorComponent,
    SearchComponent
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
    GoogleMapsModule
  ],
  providers: [
    AuthGuard,
    DriverGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
