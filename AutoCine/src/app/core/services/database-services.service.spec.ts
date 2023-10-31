import { TestBed } from '@angular/core/testing';

import { DatabaseServicesService } from './database-services.service';

describe('DatabaseServicesService', () => {
  let service: DatabaseServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
