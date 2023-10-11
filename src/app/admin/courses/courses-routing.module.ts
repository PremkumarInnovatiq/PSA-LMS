import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCourseComponent } from './all-course/all-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AboutCourseComponent } from './about-course/about-course.component';
import { CourseApprovalComponent } from './course-approval/course-approval.component';
import { CourseKitComponent } from './course-kit/course-kit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoriesComponent } from './categories/create-categories/create-categories.component';
import { CreateCourseKitComponent } from './course-kit/create-course-kit/create-course-kit.component';
import { EditCourseKitComponent } from './course-kit/edit-course-kit/edit-course-kit.component';
import { EditCategoriesComponent } from './categories/edit-categories/edit-categories.component';
import { CreateTemplateComponent } from './course-kit/create-template/create-template.component';

const routes: Routes = [
  {
    path: 'all-courses',
    component: AllCourseComponent
  },
  {
    path: 'add-course',
    component: AddCourseComponent
  },
  {
    path: 'edit-course/:id',
    component: AddCourseComponent
  },
  {
    path: 'view-course/:id',
    component: AddCourseComponent
  },
  {
    path: 'edit-course',
    component: EditCourseComponent
  },
  {
    path: 'about-course',
    component: AboutCourseComponent
  },
  {
    path: 'course-approval',
    component: CourseApprovalComponent
  },
  {
    path: 'course-kit',
    component: CourseKitComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'create-categories',
    component:  CreateCategoriesComponent
  },
  {
    path: 'edit-categories/:id',
    component:  EditCategoriesComponent
  },
  {
    path: 'create-course-kit',
    component: CreateCourseKitComponent
  },
  {
    path: 'edit-course-kit/:id',
    component:  EditCourseKitComponent
  },
  {
    path: 'view-course-kit/:id',
    component:  EditCourseKitComponent
  },
  {
    path: 'create-template',
    component: CreateTemplateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
