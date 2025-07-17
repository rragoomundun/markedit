import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SettingsIdentity as SettingsIdentityComponent } from '../settings-identity/settings-identity';
import { SettingsSecurity as SettingsSecurityComponent } from '../settings-security/settings-security';
import { SettingsDeleteAccount as SettingsDeleteAccountComponent } from '../settings-delete-account/settings-delete-account';

@Component({
  selector: 'app-settings',
  imports: [
    TranslateModule,
    SettingsIdentityComponent,
    SettingsSecurityComponent,
    SettingsDeleteAccountComponent,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  @ViewChild('content') modalContent!: TemplateRef<any>;

  view: string;

  constructor(private modalService: NgbModal) {
    this.view = 'IDENTITY';
  }

  openModal(): void {
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  setView(view: string): void {
    this.view = view;
  }
}
