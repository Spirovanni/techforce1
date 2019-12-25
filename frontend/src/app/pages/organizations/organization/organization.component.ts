import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { NbToastrService } from '@nebular/theme';

import { OrganizationData, Organization } from '../../../@core/interfaces/common/organizations';
import { EMAIL_PATTERN, NUMBERS_PATTERN } from '../../../@auth/components';


export enum OrganizationFormMode {
  VIEW = 'View',
  EDIT = 'Edit',
  ADD = 'Add',
  EDIT_SELF = 'EditSelf',
}

@Component({
  selector: 'ngx-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit, OnDestroy {
  organizationForm: FormGroup;

  protected readonly unsubscribe$ = new Subject<void>();

  get orgName() { return this.organizationForm.get('orgName'); }

  mode: OrganizationFormMode;
  setViewMode(viewMode: OrganizationFormMode) {
    this.mode = viewMode;
  }

  constructor(private organizationsService: OrganizationData,
              private router: Router,
              private route: ActivatedRoute,
              private toasterService: NbToastrService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initOrganizationForm();
    this.loadOrganizationData();
  }

  initOrganizationForm() {
    this.organizationForm = this.fb.group({
      id: this.fb.control(''),
      orgName: this.fb.control(''),
      role: this.fb.control(''),
      firstName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      lastName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      userName: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      age: this.fb.control('', [Validators.required, Validators.min(1),
        Validators.max(120), Validators.pattern(NUMBERS_PATTERN)]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      address: this.fb.group({
        street: this.fb.control(''),
        city: this.fb.control(''),
        zipCode: this.fb.control(''),
      }),
    });
  }

  get canEdit(): boolean {
    return this.mode !== OrganizationFormMode.VIEW;
  }


  loadOrganizationData() {
    const id = this.route.snapshot.paramMap.get('id');
    const isProfile = this.route.snapshot.queryParamMap.get('profile');
    if (isProfile) {
      this.setViewMode(OrganizationFormMode.EDIT_SELF);
      this.loadOrganization();
    } else {
      if (id) {
        this.setViewMode(OrganizationFormMode.EDIT);
        this.loadOrganization(id);
      } else {
        this.setViewMode(OrganizationFormMode.ADD);
      }
    }
  }

  loadOrganization(id?) {
    const loadOrganization = this.mode === OrganizationFormMode.EDIT_SELF
      ? this.organizationsService.getCurrentOrganization() : this.organizationsService.get(id);
    loadOrganization
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((organization) => {
        this.organizationForm.setValue({
          id: organization.id,
          org_name: organization.org_name,
          org_description: organization.org_description,
        });

        // this is a place for value changes handling
        // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
      });
  }


  convertToOrganization(value: any): Organization {
    const organization: Organization = value;
    return organization;
  }

  save() {
    const organization: Organization = this.convertToOrganization(this.organizationForm.value);

    let observable = new Observable<Organization>();
    if (this.mode === OrganizationFormMode.EDIT_SELF) {
      observable = this.organizationsService.updateCurrent(organization);
    } else {
      observable = organization.id
        ? this.organizationsService.update(organization)
        : this.organizationsService.create(organization);
    }

    observable
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.toasterService.success('', `Item ${this.mode === OrganizationFormMode.ADD ? 'created' : 'updated' }!`);
        this.back();
      });
  }

  back() {
    this.router.navigate(['/pages']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
