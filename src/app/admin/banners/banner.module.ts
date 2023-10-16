import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBannerListComponent } from './i-banner-list/i-banner-list.component';
import { IBannerCreateComponent } from './i-banner-create/i-banner-create.component';
import { SBannerCreateComponent } from './s-banner-create/s-banner-create.component';
import { SBannerCreateListComponent } from './s-banner-create-list/s-banner-create-list.component';
import { BannerRoutingModule } from './banner-routing.module';
import { ComponentsModule } from "../../shared/components/components.module";
import { SharedModule } from '@shared';




@NgModule({
    declarations: [
        IBannerListComponent,
        IBannerCreateComponent,
        SBannerCreateComponent,
        SBannerCreateListComponent,
    ],
    imports: [
        CommonModule, BannerRoutingModule,
        ComponentsModule,SharedModule
    ]
})
export class BannerModule { }
