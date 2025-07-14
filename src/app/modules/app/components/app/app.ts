import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { Auth } from '../../../auth/services/auth/auth';
import { Store } from '../../../../shared/services/store/store';

@Component({
  selector: 'app-app',
  imports: [RouterModule, NgbDropdownModule, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(
    private router: Router,
    private authService: Auth,
    public storeService: Store,
  ) {}

  onLogoutClick(): void {
    this.authService.logout().subscribe({
      complete: () => {
        this.storeService.user = null;
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
