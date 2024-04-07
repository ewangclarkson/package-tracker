import {Injectable } from '@angular/core';
import {Roles} from "../constants/roles";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor(
    private router: Router
  ) { }

  redirect(roles :string[]) {
    if (roles.includes(Roles.ADMIN)) {
      return this.router.navigate(["/admin"]);
    }
    if (roles.includes(Roles.DRIVER)) {
      return this.router.navigate(["/driver"]);
    }

   return  this.router.navigate(["/customer"]);
  }
}
