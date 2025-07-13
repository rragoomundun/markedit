import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoggedOutHeader } from '../../../../core/components/logged-out-header/logged-out-header';
import { LoggedOutFooter } from '../../../../core/components/logged-out-footer/logged-out-footer';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, LoggedOutHeader, LoggedOutFooter],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {}
