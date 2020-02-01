import { Observable } from 'rxjs';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Settings } from './settings';

export interface User {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  userName: string;
  picture: string;
  address: Address;
  settings: Settings;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export interface Organization {
  id: number;
  org_name: string;
  org_description: string;
}

export abstract class OrganizationData {
  abstract get gridDataSource(): DataSource;
  abstract getCurrentOrganization(): Observable<Organization>;
  abstract list(pageNumber: number, pageSize: number): Observable<Organization[]>;
  abstract get(id: number): Observable<Organization>;
  abstract update(organization: Organization): Observable<Organization>;
  abstract updateCurrent(organization: Organization): Observable<Organization>;
  abstract create(organization: Organization): Observable<Organization>;
  abstract delete(id: number): Observable<boolean>;
}

export abstract class UserData {
  abstract get gridDataSource(): DataSource;
  abstract getCurrentUser(): Observable<User>;
  abstract list(pageNumber: number, pageSize: number): Observable<User[]>;
  abstract get(id: number): Observable<User>;
  abstract update(user: User): Observable<User>;
  abstract updateCurrent(user: User): Observable<User>;
  abstract create(user: User): Observable<User>;
  abstract delete(id: number): Observable<boolean>;
}
