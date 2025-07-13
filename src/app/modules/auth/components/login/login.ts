import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Input } from '../../../../shared/components/input/input';

import { Auth } from '../../services/auth/auth';
import { Store } from '../../../../shared/services/store/store';

@Component({
  selector: 'app-login',
  imports: [TranslateModule, ReactiveFormsModule, RouterModule, Input],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  formGroup: FormGroup;
  formErrors: any;
  onLogin: string;
  loginError: string;

  constructor(
    private authService: Auth,
    private storeService: Store,
  ) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.formErrors = {};
    this.loginError = '';
    this.onLogin = 'false';
  }

  onSubmit(): void {
    const params = this.formGroup.value;

    this.onLogin = 'true';

    this.authService.login(params).subscribe({
      complete: () => {
        this.onLogin = 'success';
        this.formErrors = {};

        window.location.href = window.location.origin;
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onLogin = 'error';

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors = error.error.error;
          } else {
            this.loginError = `LOGIN_PAGE.ERRORS.${type}`;
          }
        }
      },
    });
  }
}
