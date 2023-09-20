import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveListComponent } from './approve-list.component';

describe('ApproveListComponent', () => {
  let component: ApproveListComponent;
  let fixture: ComponentFixture<ApproveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveListComponent]
    });
    fixture = TestBed.createComponent(ApproveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
