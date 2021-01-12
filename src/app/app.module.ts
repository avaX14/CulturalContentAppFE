import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { RouterModule } from "@angular/router";
import { appRouting } from "./app-routing";
import { RoutingService } from "./shared/services/routing.service";
import { AuthService } from "./shared/services/auth.service";
import { HttpService } from "./shared/services/http.service";
import { AuthGuard } from "./shared/guards/auth.guard";
import { GuestGuard } from "./shared/guards/guest.guard";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { SocketsService } from "./shared/services/sockets.service";

@NgModule({
  declarations: [AppComponent, NavigationBarComponent],
  imports: [
    BrowserModule,
    RouterModule,
    appRouting,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    RoutingService,
    AuthService,
    HttpService,
    SocketsService,
    AuthGuard,
    GuestGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
