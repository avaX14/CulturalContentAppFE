import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  public user = {};
  loginForm: FormGroup;
  private _errorSubscriptions: Array<Subscription> = [];
  errorObject: any = {};

  public constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) {
    this.loginForm = this.createFormGroup();
  }

  public ngOnInit() {
    this._errorSubscriptions.push(
      this._authService.requestErrors$.subscribe((errors) => {
        this.errorObject.errorMessage = errors;
        this.errorObject.errorType = 'login';
      })
    );
  }

  public ngOnDestroy() {
    this._errorSubscriptions.forEach((s) => s.unsubscribe());
  }

  public login() {
    this.user = this.loginForm.value;
    this._authService.login(this.user);
  }

  createFormGroup() {
    return this._formBuilder.group({
      username: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
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
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
