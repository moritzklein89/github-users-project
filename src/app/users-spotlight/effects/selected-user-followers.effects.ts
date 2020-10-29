import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UsersSpotlightState } from '../reducers';
import { UserQueryService } from '../services/user-query.service';
import { LoadSelectedUser, SelectedUserActionTypes, SelectedUserError } from '../actions/selected-user.actions';
import { LoadSelectedUserFollowers } from '../actions/selected-user-followers.actions';

@Injectable()
export class SelectedUserFollowersEffects {

  @Effect()
  loadSelectedUser$ = this.actions$
  .pipe(
    ofType<LoadSelectedUser>(SelectedUserActionTypes.LoadSelectedUser),
    mergeMap((action) => this.userQueryService.getFollowersWithFollowers(action.payload.selectedUserData.followers_url)
    .pipe(
      map(followersWithFollowers => {
        return (new LoadSelectedUserFollowers({selectedUserFollowersData: followersWithFollowers}));
      }),
      catchError((errorMessage) => of(new SelectedUserError({error: errorMessage})))
    ))
  );

  constructor(private actions$: Actions, private store: Store<UsersSpotlightState>, private userQueryService: UserQueryService) { }

}
