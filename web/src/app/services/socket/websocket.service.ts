import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  //   private socket?: WebSocket;
  //
  // public connect(url:string): Observable<any> {
  //
  //   this.socket = new WebSocket(url);
  //
  //   return new Observable(observer => {
  //     this.socket.onmessage = (event) => observer.next(event.data);
  //     this.socket.onerror = (error) => observer.error(error);
  //     this.socket.onclose = () => observer.complete();
  //
  //     return () => this.socket.close();
  //   });
  // }
  //
  // public sendMessage(message: string): void {
  //   this.socket.send(message);
  // }
}
