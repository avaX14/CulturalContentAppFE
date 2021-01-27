import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { RoutingService } from "../services/routing.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _routingService: RoutingService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this._authService.checkIfUserIsLogIn() && this.checkUserRole(route)) {
        return resolve(true);
      }
      this._routingService.goHomePage();
      return resolve(false);
    });
  }

  checkUserRole(route: ActivatedRouteSnapshot) {
    const userRoles = this._authService.getRoles();
    if (!userRoles.includes(route.data.role)) {
      return false;
    }
    return true;
  }
}
