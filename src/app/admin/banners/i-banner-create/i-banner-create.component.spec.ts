import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IBannerCreateComponent } from './i-banner-create.component';

describe('IBannerCreateComponent', () => {
  let component: IBannerCreateComponent;
  let fixture: ComponentFixture<IBannerCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IBannerCreateComponent]
    });
    fixture = TestBed.createComponent(IBannerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
