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
import { CreateOfferPageComponent } from "./offers/create-offer-page/create-offer-page.component";
import { OfferMapComponent } from "./offers/offer-map/offer-map.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { SharedModule } from "./shared/modules/shared.module";
import { InputFieldComponent } from "./shared/components/input-field/input-field.component";
import { MatInputModule } from "@angular/material/input";
import { HomePageComponent } from "./home-page/home-page.component";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    CreateOfferPageComponent,
    OfferMapComponent,
    InputFieldComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    appRouting,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LeafletModule,
    SharedModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    RoutingService,
    AuthService,
    HttpService,
    SocketsService,
    AuthGuard,
    GuestGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
