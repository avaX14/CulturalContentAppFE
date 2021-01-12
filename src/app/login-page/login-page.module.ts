import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/modules/shared.module";
import { loginPageRouting } from "./login-page.routing";
import { LoginPageComponent } from "./login-page.component";

@NgModule({
  imports: [RouterModule.forChild(loginPageRouting), SharedModule],
  declarations: [LoginPageComponent],
  exports: [RouterModule]
})
export class LoginPageModule {}
