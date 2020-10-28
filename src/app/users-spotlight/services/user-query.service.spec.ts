import { TestBed } from '@angular/core/testing';

import { UserQueryService } from './user-query.service';
// TODO fix/add tests
describe('UserQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserQueryService = TestBed.get(UserQueryService);
    expect(service).toBeTruthy();
  });
});
