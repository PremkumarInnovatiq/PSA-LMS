import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { ComponentsModule } from "../../shared/components/components.module";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { UsersRoutingModule } from './users-routing.module';
import { UserTypeComponent } from './user-type/user-type.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { CreateAllUsersComponent } from './create-all-users/create-all-users.component';


@NgModule({
    declarations: [
        UserTypeComponent,
        AllUsersComponent,
        CreateAllUsersComponent
    ],
    imports: [
        CommonModule, UsersRoutingModule,
        ComponentsModule,SharedModule,OwlDateTimeModule,OwlNativeDateTimeModule
    ]
})
export class UsersModule { }
