import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private socket: Socket) {
  }

  sendMessage(name: string, message: any) {
    this.socket.emit(name, message);
  }

  getMessage(name: string) : any {
    return this.socket.fromEvent(name).pipe(map((data) =>data));
  }
}
