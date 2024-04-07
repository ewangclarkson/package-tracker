import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DeliveryResponse} from "../../models/delivery-response.model";
import {DeliveryRequest} from "../../models/delivery-request.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = environment.deliveryApiUrl;

  constructor(private http: HttpClient) {
  }

  getDelivery(deliveryId: string): Observable<DeliveryResponse> {
    return this.http.get<DeliveryResponse>(`${this.apiUrl}/api/delivery/${deliveryId}`);
  }

  getDeliveries(): Observable<DeliveryResponse[]> {
    return this.http.get<DeliveryResponse[]>(`${this.apiUrl}/api/delivery`);
  }

  createDelivery(deliveryRequest: DeliveryRequest): Observable<DeliveryResponse> {
    return this.http.post<DeliveryResponse>(`${this.apiUrl}/api/delivery`, deliveryRequest);
  }

  updateDelivery(deliveryId: string, deliveryRequest: DeliveryRequest): Observable<DeliveryResponse> {
    return this.http.put<DeliveryResponse>(`${this.apiUrl}/api/delivery/${deliveryId}`, deliveryRequest);
  }

  deleteDelivery(deliveryId: string): Observable<DeliveryResponse> {
    return this.http.delete<DeliveryResponse>(`${this.apiUrl}/api/delivery/${deliveryId}`);
  }
}
