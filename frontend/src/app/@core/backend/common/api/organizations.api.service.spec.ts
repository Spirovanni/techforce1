import { TestBed } from '@angular/core/testing';

import { Organizations.ApiService } from './organizations.api.service';

describe('Organizations.ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Organizations.ApiService = TestBed.get(Organizations.ApiService);
    expect(service).toBeTruthy();
  });
});
