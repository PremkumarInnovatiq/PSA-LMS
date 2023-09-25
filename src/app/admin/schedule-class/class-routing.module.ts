import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassListComponent } from './class-list/class-list.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { ApproveListComponent } from './approve-list/approve-list.component';
import { CompletionListComponent } from './completion-list/completion-list.component';

const routes: Routes = [
  {
    path:'class-list',
    component:ClassListComponent
  },
  {
    path:'create-class',
    component:CreateClassComponent
  },
  {
    path:'edit-class/:id' ,
    component:CreateClassComponent
  },
  // {
  //   path:'edit-class',
  //   component:EditClassComponent
  // },
  {
    path:'approve-list',
    component:ApproveListComponent
  },
  {
    path:'completion-list',
    component:CompletionListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
