import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SBannerCreateComponent } from './s-banner-create.component';

describe('SBannerCreateComponent', () => {
  let component: SBannerCreateComponent;
  let fixture: ComponentFixture<SBannerCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SBannerCreateComponent]
    });
    fixture = TestBed.createComponent(SBannerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
