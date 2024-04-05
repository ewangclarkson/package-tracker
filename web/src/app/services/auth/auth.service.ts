import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../storage/local/storage.service";
import {UserResponse} from "../../models/user-response.model";
import {UserRequest} from "../../models/user-request.model";
import {LoginRequest} from "../../models/login-request.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../../models/login-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.userApiUrl;

  constructor(private http: HttpClient) {
  }

  register(registerUserRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/api/users/register`, registerUserRequest);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/users/login`, loginRequest);
  }
}
