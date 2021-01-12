import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-error-message",
  templateUrl: "./error-message.component.html"
})
export class ErrorMessageComponent implements OnInit {
  @Input()
  errorObject;

  @Input()
  inputType;

  constructor() {}

  ngOnInit() {}
}
