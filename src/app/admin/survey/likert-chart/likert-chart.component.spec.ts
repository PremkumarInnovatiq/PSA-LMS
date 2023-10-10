import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikertChartComponent } from './likert-chart.component';

describe('LikertChartComponent', () => {
  let component: LikertChartComponent;
  let fixture: ComponentFixture<LikertChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikertChartComponent]
    });
    fixture = TestBed.createComponent(LikertChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
