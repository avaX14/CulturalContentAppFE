import { NgModule } from "@angular/core";
import { RegistrationPageComponent } from "./registration-page.component";
import { RouterModule } from "@angular/router";
import { registrationPageRouting } from "./registration-page.routing";
import { SharedModule } from "../shared/modules/shared.module";

@NgModule({
  imports: [RouterModule.forChild(registrationPageRouting), SharedModule],
  declarations: [RegistrationPageComponent],
  exports: [RouterModule]
})
export class RegistrationPageModule {}
