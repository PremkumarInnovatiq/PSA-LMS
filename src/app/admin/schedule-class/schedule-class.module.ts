import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassRoutingModule } from './class-routing.module';
import { ClassListComponent } from './class-list/class-list.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { ApproveListComponent } from './approve-list/approve-list.component';
import { CompletionListComponent } from './completion-list/completion-list.component';



@NgModule({
  declarations: [
    ClassListComponent,
    CreateClassComponent,
    ApproveListComponent,
    CompletionListComponent

  ],
  imports: [
    CommonModule,ClassRoutingModule
  ]
})
export class ScheduleClassModule { }