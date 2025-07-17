import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Store as StoreService } from '../../../../shared/services/store/store';
import { User as UserService } from '../../../../shared/services/user/user';

@Component({
  selector: 'app-settings-identity',
  imports: [ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './settings-identity.html',
  styleUrl: './settings-identity.scss',
})
export class SettingsIdentity {
  formGroup: FormGroup;
  formErrors: any;
  onUpdate: string;

  constructor(
    private storeService: StoreService,
    private userService: UserService,
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl(this.storeService.user?.name, [
        Validators.required,
      ]),
      email: new FormControl(this.storeService.user?.email, [
        Validators.required,
      ]),
    });
    this.formErrors = {};
    this.onUpdate = 'false';
  }

  onUpdateClick(): void {
    const params = this.formGroup.value;

    this.onUpdate = 'true';

    this.userService.updateIdentity(params).subscribe({
      next: () => {
        if (this.storeService.user) {
          this.storeService.user.name = params.name;
          this.storeService.user.email = params.email;
        }

        this.onUpdate = 'success';
        this.formErrors = {};
      },
      error: (error: HttpErrorResponse) => {
        this.onUpdate = 'error';
        this.formErrors = error.error.error;
      },
    });
  }
}
