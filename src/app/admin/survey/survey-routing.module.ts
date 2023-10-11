import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { LikertChartComponent } from './likert-chart/likert-chart.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';

const routes: Routes = [
  {
    path:"survey-list",
    component: SurveyListComponent
  },
  {
    path:"likert-chart",
    component: LikertChartComponent
  },

  {
    path:"create-survey",
    component: CreateSurveyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
