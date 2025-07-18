import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { Input as InputComponent } from '../../../../shared/components/input/input';

import { Translation as TranslationService } from '../../../../shared/services/translation/translation';
import { Store as StoreService } from '../../../../shared/services/store/store';
import { User as UserService } from '../../../../shared/services/user/user';
import { Auth as AuthService } from '../../../auth/services/auth/auth';

@Component({
  selector: 'app-settings-delete-account',
  imports: [ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './settings-delete-account.html',
  styleUrl: './settings-delete-account.scss',
})
export class SettingsDeleteAccount {
  formGroup: FormGroup;
  onDelete: string;

  deleted = output<void>();

  constructor(
    private router: Router,
    private translationService: TranslationService,
    private storeService: StoreService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.formGroup = new FormGroup({
      confirmationString: new FormControl('', [
        Validators.required,
        Validators.pattern(this.translationService.instant('delete')),
      ]),
    });
    this.onDelete = 'false';
  }

  onDeleteClick(): void {
    this.onDelete = 'true';

    this.userService.deleteAccount().subscribe({
      complete: () => {
        this.onDelete = 'success';

        this.authService.logout().subscribe({
          complete: () => {
            this.storeService.user = null;

            setTimeout(() => {
              this.deleted.emit();
              this.router.navigate(['/auth/register']);
            }, 3000);
          },
        });
      },
    });
  }
}
