import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoResourceComponent } from './video-resource.component';

describe('VideoResourceComponent', () => {
  let component: VideoResourceComponent;
  let fixture: ComponentFixture<VideoResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoResourceComponent]
    });
    fixture = TestBed.createComponent(VideoResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
