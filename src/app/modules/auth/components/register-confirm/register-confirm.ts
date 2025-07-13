import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { Auth } from '../../services/auth/auth';
import { Translation } from '../../../../shared/services/translation/translation';

@Component({
  selector: 'app-register-confirm',
  imports: [TranslateModule],
  templateUrl: './register-confirm.html',
  styleUrl: './register-confirm.scss',
})
export class RegisterConfirm {
  onRegisterConfirm: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: Auth,
    private translationService: Translation,
  ) {
    this.onRegisterConfirm = 'false';
  }

  ngOnInit(): void {
    const { confirmationToken } = this.activatedRoute.snapshot.params;

    this.authService.registerConfirm(confirmationToken).subscribe({
      complete: () => {
        this.onRegisterConfirm = 'success';
        setTimeout(() => (window.location.href = window.location.origin), 3000);
      },
      error: () => (this.onRegisterConfirm = 'error'),
    });
  }
}
