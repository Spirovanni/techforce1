import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';
import { O } from './organization/organization.component';
import {AdminGuard} from '../../@auth/admin.guard';

const routes: Routes = [{
  path: '',
  component: OrganizationsComponent,
  children: [
    {
      path: 'edit/:id',
      canActivate: [AdminGuard],
      component: OrganizationsComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {

}
