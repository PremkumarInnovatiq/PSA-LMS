import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { AboutTeacherComponent } from './about-teacher/about-teacher.component';
import { VideoResourceComponent } from './video-resource/video-resource.component';
import { ArticleComponent } from './article/article.component';
import { AgreementTCComponent } from './agreement-t-c/agreement-t-c.component';

const routes: Routes = [
  {
    path: 'all-instructors',
    component: AllTeachersComponent,
  },
  {
    path: 'add-instructor',
    component: AddTeacherComponent,
  },
  {
    path: 'edit-instructor/:id',
    component: EditTeacherComponent,
  },
  {
    path: 'about-instructor',
    component: AboutTeacherComponent,
  },
  {
    path: 'video-resource',
    component: VideoResourceComponent,
  },
  {
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'agreement-t-c',
    component: AgreementTCComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
