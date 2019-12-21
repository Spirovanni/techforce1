import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Settings } from './settings';

export interface Organization {
  id: number;
  org_name: string;
  org_description: string;
}

export abstract class OrganizationData {
  abstract 
}
