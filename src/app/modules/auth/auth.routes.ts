import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Auth } from './components/auth/auth';
import { Register } from './components/register/register';
import { RegisterConfirm } from './components/register-confirm/register-confirm';
import { Login } from './components/login/login';
import { PasswordForgotten } from './components/password-forgotten/password-forgotten';
import { ResetPassword } from './components/reset-password/reset-password';

const routes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: Register,
        data: { title: 'REGISTER_PAGE.TITLE' },
      },
      {
        path: 'register/confirm/:confirmationToken',
        component: RegisterConfirm,
        data: { title: 'REGISTER_CONFIRM_PAGE.TITLE' },
      },
      {
        path: 'login',
        component: Login,
        data: { title: 'LOGIN_PAGE.TITLE' },
      },
      {
        path: 'password',
        children: [
          {
            path: 'forgotten',
            component: PasswordForgotten,
            data: { title: 'PASSWORD_FORGOTTEN_PAGE.TITLE' },
          },
          {
            path: 'reset/:resetPasswordToken',
            component: ResetPassword,
            data: { title: 'RESET_PASSWORD_PAGE.TITLE' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutes {}
