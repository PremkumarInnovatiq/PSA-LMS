import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WelcomeMailComponent } from './welcome-mail/welcome-mail.component';
import { InstructorRequestComponent } from './instructor-request/instructor-request.component';
import { InviteUserRejectComponent } from './invite-user-reject/invite-user-reject.component';
import { NewStudentReferredComponent } from './new-student-referred/new-student-referred.component';
import { CourseReferralInviteComponent } from './course-referral-invite/course-referral-invite.component';
import { CompletedCourseComponent } from './completed-course/completed-course.component';
import { InstructorCourseInviteComponent } from './instructor-course-invite/instructor-course-invite.component';
import { InstructorAcceptCourseInviteComponent } from './instructor-accept-course-invite/instructor-accept-course-invite.component';
import { SendCourseInvoiceComponent } from './send-course-invoice/send-course-invoice.component';
import { AdminNewEmailComponent } from './admin-new-email/admin-new-email.component';


const routes: Routes = [
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'welcome-mail',
        component: WelcomeMailComponent
      },
      {
        path: 'instructor-request',
        component: InstructorRequestComponent
      },
      {
        path: 'invite-user-reject',
        component: InviteUserRejectComponent
      },
      {
        path: 'new-student-referred',
        component: NewStudentReferredComponent
      },
      {
        path: 'course-referral-invite',
        component: CourseReferralInviteComponent
      },
      {
        path: 'completed-course',
        component: CompletedCourseComponent
      },
      {
        path: 'instructor-course-invite',
        component: InstructorCourseInviteComponent
      },
      {
        path: 'instructor-accept-course-invite',
        component: InstructorAcceptCourseInviteComponent
      },
      {
        path: 'send-course-invoice',
        component: SendCourseInvoiceComponent
      },
      {
        path: 'admin-new-email',
        component: AdminNewEmailComponent
      },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailConfigurationRoutingModule { }
