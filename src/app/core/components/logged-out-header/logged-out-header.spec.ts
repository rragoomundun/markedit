import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutHeader } from './logged-out-header';

describe('LoggedOutHeader', () => {
  let component: LoggedOutHeader;
  let fixture: ComponentFixture<LoggedOutHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedOutHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedOutHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
