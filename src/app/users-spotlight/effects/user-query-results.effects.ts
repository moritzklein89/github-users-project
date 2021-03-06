import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UsersSpotlightState } from '../reducers';
import { UserQueryService } from '../services/user-query.service';
import { LoadUserQueryResults } from '../actions/user-query-results.actions';
import { UserQueryInputActionTypes, UserQueryInputError, LoadUserQueryInput } from '../actions/user-query-input.actions';

@Injectable()
export class UserQueryResultsEffects {

  @Effect()
  loadUserQueryInput$ = this.actions$
    .pipe(
      ofType<LoadUserQueryInput>(UserQueryInputActionTypes.LoadUserQueryInput),
      mergeMap((action) => this.userQueryService.getUsers(action.payload.userQueryInputData)
        .pipe(
          map(userQueryResults => {
            return (new LoadUserQueryResults({ userQueryResultsData: userQueryResults }));
          }),
          catchError((errorMessage) => of(new UserQueryInputError({ error: errorMessage })))
        ))
    );

  constructor(private actions$: Actions, private store: Store<UsersSpotlightState>, private userQueryService: UserQueryService) { }

}
