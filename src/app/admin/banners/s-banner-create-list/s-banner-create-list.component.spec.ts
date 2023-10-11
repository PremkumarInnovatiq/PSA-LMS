import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SBannerCreateListComponent } from './s-banner-create-list.component';

describe('SBannerCreateListComponent', () => {
  let component: SBannerCreateListComponent;
  let fixture: ComponentFixture<SBannerCreateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SBannerCreateListComponent]
    });
    fixture = TestBed.createComponent(SBannerCreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
