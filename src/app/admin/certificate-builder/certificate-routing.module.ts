import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesComponent } from './certificates/certificates.component';
import { DesignComponent } from './design/design.component';


const routes: Routes = [
    {
        path: 'certificates',
        component: CertificatesComponent
      },
      {
        path: 'design',
        component: DesignComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule { }
