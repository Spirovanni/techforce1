import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { AuthModule } from '../../@auth/auth.module';

// components
import { OrganizationsComponent } from './organizations.component';
import { OrganizationComponent } from './organization/organization.component';
import { ComponentsModule } from '../../@components/components.module';
// components

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { OrganizationDetailsComponent } from './organization/organization-details/organization-details.component';
import { OrganizationFormComponent } from './organization/organization-form/organization-form.component';

const  NB_MODULES = [
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule,
  NbInputModule,
];

@NgModule({
  imports: [
    ThemeModule,
    AuthModule,
    Ng2SmartTableModule,
    OrganizationsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    ...NB_MODULES,
  ],
  declarations: [
    OrganizationsComponent,
    OrganizationComponent,
    OrganizationListComponent,
    OrganizationDetailsComponent,
    OrganizationFormComponent,
  ],
  entryComponents: [
  ],
  providers: [],
})
export class OrganizationsModule { }
