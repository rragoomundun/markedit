import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { App } from './components/app/app';
import { Home } from './components/home/home';

const routes: Routes = [
  {
    path: '',
    component: App,
    children: [{ path: '', component: Home }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
