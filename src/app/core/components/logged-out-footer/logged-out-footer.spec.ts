import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutFooter } from './logged-out-footer';

describe('LoggedOutFooter', () => {
  let component: LoggedOutFooter;
  let fixture: ComponentFixture<LoggedOutFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedOutFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedOutFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
