import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent implements OnInit {

  organizations = ['Chase Bank', 'Bank of America', 'Wells Fargo'];
  constructor() { }

  ngOnInit() {
  }

}
