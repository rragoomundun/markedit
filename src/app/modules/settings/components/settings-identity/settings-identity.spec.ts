import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIdentity } from './settings-identity';

describe('SettingsIdentity', () => {
  let component: SettingsIdentity;
  let fixture: ComponentFixture<SettingsIdentity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsIdentity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsIdentity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
