import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../../shared/components/components.module";
import { SharedModule } from '@shared';
import { EmailConfigurationRoutingModule } from './email-configuration-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WelcomeMailComponent } from './welcome-mail/welcome-mail.component';
import { InstructorRequestComponent } from './instructor-request/instructor-request.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
    declarations: [
      
    
    ForgotPasswordComponent,
                 WelcomeMailComponent,
                 InstructorRequestComponent
  ],
    imports: [
        CommonModule, EmailConfigurationRoutingModule,
        ComponentsModule,SharedModule, CKEditorModule,
    ]
})
export class EmailConfigurationModule { }
