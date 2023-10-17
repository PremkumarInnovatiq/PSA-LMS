import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeworkComponent } from './homework/homework.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { TimetableComponent } from './timetable/timetable.component';
import { SettingsComponent } from './settings/settings.component';
import { CourseComponent } from './course/course.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { ProgramComponent } from './program/program.component';
import { ViewProgramComponent } from './view-program/view-program.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'courses/student-courses',
    component: CourseComponent,
  },
  {
    path: 'view-course/:id',
    component: ViewCourseComponent,
  },
  {
    path: 'program/student-programs',
    component: ProgramComponent,
  },
  {
    path: 'view-program/:id',
    component: ViewProgramComponent,
  },

  {
    path: 'homework',
    component: HomeworkComponent,
  },
  {
    path: 'leave-request/student-leaves',
    component: LeaveRequestComponent,
  },
  {
    path: 'timetable',
    component: TimetableComponent,
  },
  {
    path: 'settings/student-settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
