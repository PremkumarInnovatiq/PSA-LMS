import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { LikertChartComponent } from './likert-chart/likert-chart.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { SurveyRoutingModule } from './survey-routing.module';
import { CreateSurveyComponent } from './create-survey/create-survey.component';




@NgModule({
  declarations: [
    SurveyListComponent,LikertChartComponent, CreateSurveyComponent
  ],
  imports: [
    CommonModule,SurveyRoutingModule,
    ComponentsModule,SharedModule
  ]
})
export class SurveyModule { }
