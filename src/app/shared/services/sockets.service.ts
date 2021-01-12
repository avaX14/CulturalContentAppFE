import { Injectable } from "@angular/core";
import Echo from "laravel-echo";

@Injectable({
  providedIn: "root"
})
export class SocketsService {
  echo: Echo = new Echo({
    broadcaster: "pusher",
    key: "eb71869392e8cc087266",
    cluster: "eu",
    forceTLS: true
  });

  constructor() {}

  channel(channelName) {
    return this.echo.channel(channelName);
  }
}
