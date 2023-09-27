import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AboutCourseComponent } from './about-course/about-course.component';
import { AllCourseComponent } from './all-course/all-course.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { CourseApprovalComponent } from './course-approval/course-approval.component';
import { CourseKitComponent } from './course-kit/course-kit.component';
import { CategoriesComponent } from './categories/categories.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateCategoriesComponent } from './categories/create-categories/create-categories.component';

import { VideoPlayerComponent } from './course-kit/video-player/video-player.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateCourseKitComponent } from './course-kit/create-course-kit/create-course-kit.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';


@NgModule({
  declarations: [
    AddCourseComponent,
    EditCourseComponent,
    AboutCourseComponent,
    AllCourseComponent,
    CourseApprovalComponent,
    CourseKitComponent,
    CategoriesComponent,
    CreateCategoriesComponent,

    VideoPlayerComponent,
    CreateCourseKitComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    ComponentsModule,
    SharedModule,
    MatStepperModule,
    ModalModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
})
export class CoursesModule {}
