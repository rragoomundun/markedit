import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-logged-out-header',
  imports: [RouterModule, TranslateModule],
  templateUrl: './logged-out-header.html',
  styleUrl: './logged-out-header.scss',
})
export class LoggedOutHeader {}
