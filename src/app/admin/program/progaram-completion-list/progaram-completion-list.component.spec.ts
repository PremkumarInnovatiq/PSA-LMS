import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgaramCompletionListComponent } from './progaram-completion-list.component';

describe('ProgaramCompletionListComponent', () => {
  let component: ProgaramCompletionListComponent;
  let fixture: ComponentFixture<ProgaramCompletionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgaramCompletionListComponent]
    });
    fixture = TestBed.createComponent(ProgaramCompletionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
