import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Input } from '../../../../shared/components/input/input';

import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-register',
  imports: [TranslateModule, ReactiveFormsModule, Input],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  formGroup: FormGroup;
  formErrors: any;
  registerError: string;
  onRegister: string;

  constructor(private authService: Auth) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    });
    this.formErrors = {};
    this.registerError = '';
    this.onRegister = 'false';
  }

  onSubmit(): void {
    const params = this.formGroup.value;

    this.onRegister = 'true';

    this.authService.register(params).subscribe({
      complete: () => {
        this.onRegister = 'success';
        this.formErrors = {};
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onRegister = 'error';

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors = error.error.error;
          } else {
            this.formErrors = {};
            this.registerError = `REGISTER_PAGE.ERRORS.${type}`;
          }
        }
      },
    });
  }
}
