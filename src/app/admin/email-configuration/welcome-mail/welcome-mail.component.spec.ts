import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeMailComponent } from './welcome-mail.component';

describe('WelcomeMailComponent', () => {
  let component: WelcomeMailComponent;
  let fixture: ComponentFixture<WelcomeMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeMailComponent]
    });
    fixture = TestBed.createComponent(WelcomeMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
