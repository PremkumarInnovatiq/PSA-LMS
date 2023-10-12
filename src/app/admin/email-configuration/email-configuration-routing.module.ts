import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WelcomeMailComponent } from './welcome-mail/welcome-mail.component';
import { InstructorRequestComponent } from './instructor-request/instructor-request.component';


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailConfigurationRoutingModule { }
