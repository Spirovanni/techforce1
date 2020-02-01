import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../@core/backend/common/services/api.service';

@Component({
  selector: 'ngx-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent implements OnInit {

  organizations: () =>  any;
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.organizations = this.apiService.getOrganizations();
  }

}
