import { TestBed } from '@angular/core/testing';

import { TestsManagementService } from './tests-management.service';

describe('TestsManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestsManagementService = TestBed.get(TestsManagementService);
    expect(service).toBeTruthy();
  });
});
