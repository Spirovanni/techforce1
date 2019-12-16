/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../@core/backend/common/services/api.service';

@Component({
  selector: 'ngx-organization-list',
  styleUrls: ['./organization-list.component.scss'],
  templateUrl: './organization-list.component.html',
})
export class OrganizationListComponent implements OnInit {
  organizations: Object = [];

  constructor(
    private apiService: ApiService,
  ) {

  }
  ngOnInit() {
    this.apiService.getOrganizations().subscribe(
      data => {
        this.organizations = data;
      },
      error => console.log(error),
    );
  }

}
