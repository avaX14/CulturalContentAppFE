import { Component } from "@angular/core";
import { RoutingService } from "../shared/services/routing.service";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: "navigation-bar",
  templateUrl: "./navigation-bar.component.html"
})
export class NavigationBarComponent {
  public constructor(
    public routingService: RoutingService,
    public authService: AuthService
  ) {}
}
