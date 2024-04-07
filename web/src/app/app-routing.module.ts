import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/pages/login/login.component";
import {CustomerComponent} from "./components/pages/customer/customer.component";
import {DriverComponent} from "./components/pages/driver/driver.component";
import {AdminComponent} from "./components/pages/admin/admin.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {DriverGuard} from "./guards/driver/driver.guard";
import {AdminGuard} from "./guards/admin/admin.guard";
import {ErrorComponent} from "./components/pages/error/error/error.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'customer', component: CustomerComponent, canActivate: [AuthGuard]},
  {path: 'driver', component: DriverComponent, canActivate: [DriverGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
