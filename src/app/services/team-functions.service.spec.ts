import { TestBed } from '@angular/core/testing';

import { TeamFunctionsService } from './team-functions.service';

describe('TeamFunctionsService', () => {
  let service: TeamFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
