import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-logged-out-footer',
  imports: [TranslateModule],
  templateUrl: './logged-out-footer.html',
  styleUrl: './logged-out-footer.scss',
})
export class LoggedOutFooter {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
