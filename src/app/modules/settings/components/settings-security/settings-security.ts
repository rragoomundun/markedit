import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { User as UserService } from '../../../../shared/services/user/user';

@Component({
  selector: 'app-settings-security',
  imports: [ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './settings-security.html',
  styleUrl: './settings-security.scss',
})
export class SettingsSecurity {
  formGroup: FormGroup;
  formErrors: any;
  onUpdate: string;
  error: string;

  constructor(private userService: UserService) {
    this.formGroup = new FormGroup({
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    });
    this.formErrors = {};
    this.onUpdate = 'false';
    this.error = '';
  }

  onUpdateClick(): void {
    const params = this.formGroup.value;

    this.onUpdate = 'true';

    this.userService.updatePassword(params).subscribe({
      complete: () => {
        this.onUpdate = 'success';
        this.formErrors = {};
      },
      error: (error: HttpErrorResponse) => {
        const { type } = error.error;

        this.onUpdate = 'error';

        if (type) {
          if (type === 'INVALID_PARAMETERS') {
            this.formErrors = error.error.error;
          } else {
            this.formErrors = {};
            this.error = `REGISTER_PAGE.ERRORS.${type}`;
          }
        }
      },
    });
  }
}
