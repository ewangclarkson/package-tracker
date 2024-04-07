import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {StorageService} from "../../../services/storage/local/storage.service";
import {LoginResponse} from "../../../models/login-response.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserResponse} from "../../../models/user-response.model";
import {ShareService} from "../../../shared/share.service";

const USER_KEY = 'auth-user';
const TOKEN_EXPIRY_DATE = 'expires-in';
const TOKEN = 'accessToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  user?: UserResponse;

  isLoginFailed = false;
  isLoading = false;


  constructor(private authService: AuthService,
              private storageService: StorageService,
              private toastr: ToastrService,
              private sharedService: ShareService,
              private router: Router) {
  }


  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.user = this.storageService.getCurrentUser();
      this.sharedService.redirect(this.user.roles!);
    }
  }

  onSubmit(): void {
    const {email, password} = this.form;
    this.isLoading = true;
    this.authService.login({email, password}).subscribe(
      (response: LoginResponse) => {
        this.storageService.set(USER_KEY, JSON.stringify(response.userDetails));
        this.storageService.set(TOKEN_EXPIRY_DATE, response.expiresIn);
        this.storageService.set(TOKEN, response.accessToken);
        this.sharedService.redirect(response.userDetails.roles);
      },
      (err) => {
        this.toastr.error(err.message);
        this.isLoginFailed = true;
       this.isLoading = false;
      }
    );
  }
}
