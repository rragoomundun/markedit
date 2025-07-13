import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Input } from '../../../../shared/components/input/input';

import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-reset-password',
  imports: [TranslateModule, ReactiveFormsModule, Input],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  formGroup: FormGroup;
  formErrors: any;
  onReset: string;
  resetPasswordError: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: Auth,
  ) {
    this.formGroup = new FormGroup({
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    });
    this.formErrors = {};
    this.onReset = 'false';
    this.resetPasswordError = '';
  }

  onSubmit(): void {
    const { resetPasswordToken } = this.activatedRoute.snapshot.params;
    const params = this.formGroup.value;

    this.onReset = 'true';

    this.authService.resetPassword(params, resetPasswordToken).subscribe({
      complete: () => {
        this.onReset = 'success';
        this.formErrors = {};

        setTimeout(() => (window.location.href = window.location.origin), 3000);
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onReset = 'error';

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors = error.error.error;
          } else {
            this.formErrors = {};
            this.resetPasswordError = `RESET_PASSWORD_PAGE.ERRORS.${type}`;
          }
        }
      },
    });
  }
}
