import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PackageResponse} from "../../models/package-response.model";
import {PackageRequest} from "../../models/package-request.model";

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private apiUrl = environment.packageApiUrl;

  constructor(private http: HttpClient) {
  }

  getPackage(packageId: string): Observable<PackageResponse> {
    return this.http.get<PackageResponse>(`${this.apiUrl}/api/package/${packageId}`);
  }

  getPackages(): Observable<PackageResponse[]> {
    return this.http.get<PackageResponse[]>(`${this.apiUrl}/api/package`);
  }

  createPackage(packageRequest: PackageRequest): Observable<PackageResponse> {
    return this.http.post<PackageResponse>(`${this.apiUrl}/api/package`, packageRequest);
  }

  updatePackage(packageId: string, packageRequest: PackageRequest): Observable<PackageResponse> {
    return this.http.put<PackageResponse>(`${this.apiUrl}/api/package/${packageId}`, packageRequest);
  }

  deletePackage(packageId: string): Observable<PackageResponse> {
    return this.http.delete<PackageResponse>(`${this.apiUrl}/api/package/${packageId}`);
  }

}
