import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IBannerListComponent } from './i-banner-list/i-banner-list.component';
import { IBannerCreateComponent } from './i-banner-create/i-banner-create.component';
import { SBannerCreateComponent } from './s-banner-create/s-banner-create.component';
import { SBannerCreateListComponent } from './s-banner-create-list/s-banner-create-list.component';

const routes: Routes = [
  {path:'instructor-banner-list', component:IBannerListComponent},
  {path:'create-instructor-banner', component:IBannerCreateComponent},
  {path:'student-banner-list', component:SBannerCreateListComponent},
  {path:'create-student-banner', component:SBannerCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
