import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTCComponent } from './agreement-t-c.component';

describe('AgreementTCComponent', () => {
  let component: AgreementTCComponent;
  let fixture: ComponentFixture<AgreementTCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgreementTCComponent]
    });
    fixture = TestBed.createComponent(AgreementTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
