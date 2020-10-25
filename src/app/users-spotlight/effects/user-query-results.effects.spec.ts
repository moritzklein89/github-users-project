import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserQueryResultsEffects } from './user-query-results.effects';

describe('UserQueryResultsEffects', () => {
  let actions$: Observable<any>;
  let effects: UserQueryResultsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserQueryResultsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UserQueryResultsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
