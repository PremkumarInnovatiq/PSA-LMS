import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewEmailComponent } from './admin-new-email.component';

describe('AdminNewEmailComponent', () => {
  let component: AdminNewEmailComponent;
  let fixture: ComponentFixture<AdminNewEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewEmailComponent]
    });
    fixture = TestBed.createComponent(AdminNewEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
