import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class Translation {
  constructor(private translateService: TranslateService) {}

  instant(key: string): string {
    return this.translateService.instant(key);
  }
}
