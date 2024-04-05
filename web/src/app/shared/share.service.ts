import {Injectable } from '@angular/core';
import {Roles} from "../roles";
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
      this.router.navigate(["/admin"]);
    }
    if (roles.includes(Roles.DRIVER)) {
      this.router.navigate(["/driver"]);
    }
    this.router.navigate(["/customer"]);
  }
}
