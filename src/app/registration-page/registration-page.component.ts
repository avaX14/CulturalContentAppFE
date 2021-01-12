import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'registration-page',
  templateUrl: './registration-page.component.html',
})
export class RegistrationPageComponent {
  public newUser = {};
  private _errorSubscriptions: Array<Subscription> = [];
  errorObject: any = {};
  errorMessage: any;
  registerForm: FormGroup;

  public constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) {
    this.registerForm = this.createFormGroup();
  }

  public ngOnInit() {
    this._errorSubscriptions.push(
      this._authService.requestErrors$.subscribe((errors) => {
        this.errorObject.errorType = Object.keys(errors)[0];
        this.errorObject.errorMessage = Object.values(errors)[0];
      })
    );
  }

  public ngOnDestroy() {
    this._errorSubscriptions.forEach((s) => s.unsubscribe());
  }

  public onSubmit() {
    this.newUser = this.registerForm.value;
    this._authService.register(this.newUser);
  }

  createFormGroup() {
    return this._formBuilder.group(
      {
        email: [
          '',
          {
            validators: [Validators.required, Validators.email],
            updateOn: 'blur',
          },
        ],
        username: [
          '',
          {
            validators: [Validators.required, Validators.maxLength(30)],
          },
        ],
        firstName: [
          '',
          {
            validators: [Validators.required, Validators.maxLength(30)],
          },
        ],
        lastName: [
          '',
          {
            validators: [Validators.required, Validators.maxLength(30)],
          },
        ],
        password: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(30),
            ],
          },
        ],
        repeatPassword: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(30),
            ],
          },
        ],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value ===
      frm.controls['repeatPassword'].value
      ? null
      : { mismatch: true };
  }

  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }
}
