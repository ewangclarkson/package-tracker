import {Injectable} from '@angular/core';
import {UserResponse} from "../../../models/user-response.model";

const USER_KEY = 'auth-user';
const TOKEN_EXPIRY_DATE = 'expires-in';
const TOKEN = 'accessToken';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }


  public set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public get(key: string) {
    return localStorage.getItem(key);
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }

  public hasValue(key: string): boolean {
    if (localStorage.hasOwnProperty(key)) {
      return true;
    }
    return false;
  }

  public getCurrentUser(): UserResponse {
    return JSON.parse(this.get(USER_KEY)!);
  }

  public isLoggedIn(): boolean {
    const user = this.get(USER_KEY);
    const expiresIn = this.get(TOKEN_EXPIRY_DATE);

    if (user && (new Date() <= new Date(expiresIn!))) {
      return true;
    }

    return false;
  }

  public logout(){
    this.remove(USER_KEY);
    this.remove(TOKEN_EXPIRY_DATE);
    this.remove(TOKEN);
  }
}
