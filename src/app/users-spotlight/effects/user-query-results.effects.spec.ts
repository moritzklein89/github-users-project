import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as queryInputActions from '../actions/user-query-input.actions';
import * as queryResultsActions from '../actions/user-query-results.actions';
import { UserQueryResultsEffects } from './user-query-results.effects';
import { UserQueryService } from '../services/user-query.service';
import { exampleQueryResults } from '../models/user/user-query-results';

describe('UserQueryResultsEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserQueryResultsEffects;
  let userQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserQueryResultsEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: UserQueryService,
          useValue: jasmine.createSpyObj('UserQueryService', ['getUsers'])
        }
      ]
    });

    effects = TestBed.inject(UserQueryResultsEffects);
    userQueryService = TestBed.inject(UserQueryService);
  });

  it('should dispatch LoadUserQueryResults action when LoadUserQueryInput action is dispatched', () => {
    userQueryService.getUsers.and.returnValue(of(exampleQueryResults));

    actions$ = of({
      type: queryInputActions.UserQueryInputActionTypes.LoadUserQueryInput,
      payload: {
        userQueryInputData: 'test'
      }
    });

    effects.loadUserQueryInput$.subscribe(action => {
      expect(action.type).toBe(queryResultsActions.UserQueryResultsActionTypes.LoadUserQueryResults);
      expect(action.payload).toEqual({userQueryResultsData: exampleQueryResults});
    });
  });
});
