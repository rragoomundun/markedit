import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Input } from '../../../../shared/components/input/input';

import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-password-forgotten',
  imports: [TranslateModule, ReactiveFormsModule, Input],
  templateUrl: './password-forgotten.html',
  styleUrl: './password-forgotten.scss',
})
export class PasswordForgotten {
  formGroup: FormGroup;
  formErrors: any;
  onForget: string;
  passwordForgottenError: string;

  constructor(private authService: Auth) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
    this.formErrors = {};
    this.onForget = 'false';
    this.passwordForgottenError = '';
  }

  onSubmit(): void {
    const params = this.formGroup.value;

    this.onForget = 'true';

    this.authService.forgotPassword(params).subscribe({
      complete: () => {
        this.onForget = 'success';
        this.formErrors = {};
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onForget = 'error';

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors = error.error.error;
          } else {
            this.formErrors = {};
            this.passwordForgottenError = `PASSWORD_FORGOTTEN_PAGE.ERRORS.${type}`;
          }
        }
      },
    });
  }
}
