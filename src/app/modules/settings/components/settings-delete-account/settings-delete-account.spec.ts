import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDeleteAccount } from './settings-delete-account';

describe('SettingsDeleteAccount', () => {
  let component: SettingsDeleteAccount;
  let fixture: ComponentFixture<SettingsDeleteAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsDeleteAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsDeleteAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
