import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../../shared/components/components.module";
import { SharedModule } from '@shared';
import { EmailConfigurationRoutingModule } from './email-configuration-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WelcomeMailComponent } from './welcome-mail/welcome-mail.component';
import { InstructorRequestComponent } from './instructor-request/instructor-request.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { InviteUserRejectComponent } from './invite-user-reject/invite-user-reject.component';
import { NewStudentReferredComponent } from './new-student-referred/new-student-referred.component';
import { CourseReferralInviteComponent } from './course-referral-invite/course-referral-invite.component';
import { CompletedCourseComponent } from './completed-course/completed-course.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
    declarations: [
      
    
    ForgotPasswordComponent,
                 WelcomeMailComponent,
                 InstructorRequestComponent,
                 InviteUserRejectComponent,
                 NewStudentReferredComponent,
                 CourseReferralInviteComponent,
                 CompletedCourseComponent
  ],
    imports: [
        CommonModule, EmailConfigurationRoutingModule,
        ComponentsModule,SharedModule, CKEditorModule,ModalModule.forRoot(),
    ]
})
export class EmailConfigurationModule { }
