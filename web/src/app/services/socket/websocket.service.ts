import { Injectable } from '@angular/core';
import {Observable} from "rxjs/dist/types";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket;

  public connect(): Observable<any> {

    this.socket = new WebSocket(environment.wsHost);

    return new Observable(observer => {
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (error) => observer.error(error);
      this.socket.onclose = () => observer.complete();

      return () => this.socket.close();
    });
  }

  public sendMessage(message: string): void {
    this.socket.send(message);
  }
}
