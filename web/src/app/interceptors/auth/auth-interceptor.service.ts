import {Injectable} from '@angular/core';
import {StorageService} from "../../services/storage/local/storage.service";
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

const TOKEN = 'accessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private storageService: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.get(TOKEN);
    req = req.clone({
      url: req.url,
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return next.handle(req);
  }
}
