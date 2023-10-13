import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreatAnnouncementComponent } from './list/creat-announcement/creat-announcement.component';

const routes: Routes = [
    {
      path: 'list',
      component: ListComponent,
    },
    {
      path: 'create-announcement',
      component: CreatAnnouncementComponent,
    },
    {
      path: 'edit-announcement/:id',
      component: CreatAnnouncementComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementRoutingModule {}
