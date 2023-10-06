import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAllUsersComponent } from './create-all-users.component';

describe('CreateAllUsersComponent', () => {
  let component: CreateAllUsersComponent;
  let fixture: ComponentFixture<CreateAllUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAllUsersComponent]
    });
    fixture = TestBed.createComponent(CreateAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
