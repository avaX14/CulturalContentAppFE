import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ErrorMessageComponent } from "src/app/error-message/error-message.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [ErrorMessageComponent],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorMessageComponent,
  ],
})
export class SharedModule {}
