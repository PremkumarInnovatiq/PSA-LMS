import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IBannerListComponent } from './i-banner-list.component';

describe('IBannerListComponent', () => {
  let component: IBannerListComponent;
  let fixture: ComponentFixture<IBannerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IBannerListComponent]
    });
    fixture = TestBed.createComponent(IBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
