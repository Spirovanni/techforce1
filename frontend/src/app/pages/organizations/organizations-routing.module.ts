import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';
import { OrganizationComponent } from './organization/organization.component';
import { AdminGuard } from '../../@auth/admin.guard';

const routes: Routes = [{
  path: '',
  component: OrganizationsComponent,
  children: [
    {
      path: 'edit/:id',
      canActivate: [AdminGuard],
      component: OrganizationComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {

}
