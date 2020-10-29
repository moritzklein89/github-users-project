import { TestBed } from '@angular/core/testing';

import { UserQueryService } from './user-query.service';
// TODO fix/add tests
describe('UserQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserQueryService = TestBed.inject(UserQueryService);
    expect(service).toBeTruthy();
  });
});
