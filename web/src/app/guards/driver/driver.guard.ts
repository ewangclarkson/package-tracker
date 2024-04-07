import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Roles} from "../../constants/roles";
import {StorageService} from "../../services/storage/local/storage.service";
import {DOCUMENT} from "@angular/common";
import {environment} from "../../../environments/environment";

@Injectable()
export class DriverGuard implements CanActivate {

  private apiUrl = environment.apiHost;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.storageService.getCurrentUser();
        if (user && user.roles.includes(Roles.DRIVER) && this.storageService.isLoggedIn()) {
          return true;
        } else {
          this.document.location.href=this.apiUrl;
          return false;
        }
  }
}
