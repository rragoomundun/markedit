import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth/auth-guard';
import { unauthGuard } from './core/guards/unauth/unauth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth-module').then((m) => m.AuthModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/app/app-module').then((m) => m.AppModule),
    canActivate: [unauthGuard],
  },
];
