import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { AnnouncementRoutingModule } from './announcement-routing.module';
import { ListComponent } from './list/list.component';
import { CreatAnnouncementComponent } from './list/creat-announcement/creat-announcement.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ListComponent,
    CreatAnnouncementComponent
  ],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    CKEditorModule,
    ModalModule.forRoot(),

  ],
})
export class AnnouncementModule {}
