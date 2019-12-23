import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrganizationsApi } from '../api/organizations.api';
import { OrganizationData, Organization } from '../../../interfaces/common/organizations';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { NbAuthService } from '@nebular/auth';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class OrganizationsService extends OrganizationData {

  constructor(private api: OrganizationsApi, private authService: NbAuthService) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.organizationsDataSource;
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<Organization[]> {
    return this.api.orglist(pageNumber, pageSize);
  }

  getCurrentOrganization(): Observable<Organization> {
    return this.authService.isAuthenticated()
      .pipe(
        switchMap(authenticated => {
          return authenticated ? this.api.getCurrent() : of(null);
        }),
        map(u => {
          if (u && !u.setting) {
            u.setting = {};
          }
          return u;
        }));
  }


  get(id: number): Observable<Organization> {
    return this.api.get(id);
  }

  create(user: any): Observable<Organization> {
    return this.api.add(user);
  }

  update(user: any): Observable<Organization> {
    return this.api.update(user);
  }

  updateCurrent(user: any): Observable<Organization> {
    return this.api.updateCurrent(user);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }
}
