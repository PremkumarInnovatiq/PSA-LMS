import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTypeComponent } from './user-type/user-type.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { CreateAllUsersComponent } from './create-all-users/create-all-users.component';

const routes: Routes = [
  {
    path: 'user-type',
    component: UserTypeComponent,
  },
  {
    path: 'all-users',
    component: AllUsersComponent,
  },
  {
    path: 'create-all-users',
    component: CreateAllUsersComponent
  },
  {
    path: 'edit-all-users/:id',
    component:  CreateAllUsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { 

   
}
