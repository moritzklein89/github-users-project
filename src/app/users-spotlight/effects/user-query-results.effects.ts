import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadUserQueryResults } from '../actions/user-query-results.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { UserQueryService } from '../services/user-query.service';
import { UserQueryInputActionTypes, UserQueryInputError, LoadUserQueryInput } from '../actions/user-query-input.actions';
import { of } from 'rxjs';

@Injectable()
export class UserQueryResultsEffects {

  @Effect()
  loadUserQueryInput$ = this.actions$
    .pipe(
      ofType<LoadUserQueryInput>(UserQueryInputActionTypes.LoadUserQueryInput),
      mergeMap((action) => this.userQueryService.getUsers(action.payload.userQueryInputData)
      .pipe(
        map(userQueryResults => {
          return (new LoadUserQueryResults({userQueryResultsData: userQueryResults}));
        }),
        catchError((errorMessage) => of(new UserQueryInputError({error: errorMessage})))
      ))
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private userQueryService: UserQueryService) { }

}
