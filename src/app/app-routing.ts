import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { CreateOfferPageComponent } from "./offers/create-offer-page/create-offer-page.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { GuestGuard } from "./shared/guards/guest.guard";

export let appRoutes: Routes = [
  {
    path: "login",
    loadChildren: "./login-page/login-page.module#LoginPageModule",
    canActivate: [GuestGuard],
  },
  {
    path: "register",
    loadChildren:
      "./registration-page/registration-page.module#RegistrationPageModule",
    canActivate: [GuestGuard],
  },
  {
    path: "create-offer",
    component: CreateOfferPageComponent,
    canActivate: [AuthGuard],
    data: {
      role: "ROLE_ADMIN",
    },
  },
  {
    path: "**",
    component: HomePageComponent,
    redirectTo: "",
    pathMatch: "full",
  },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
