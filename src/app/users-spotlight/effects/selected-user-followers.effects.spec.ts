import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { SelectedUserFollowersEffects } from './selected-user-followers.effects';
import { UserQueryService } from '../services/user-query.service';
import { exampleFollowersData } from '../models/user/user';
import * as selectedUserActions from '../actions/selected-user.actions';
import * as selectedUserFollowersActions from '../actions/selected-user-followers.actions';


describe('SelectedUserFollowersEffects', () => {
  let actions$: Observable<Action>;
  let effects: SelectedUserFollowersEffects;
  let userQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SelectedUserFollowersEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: UserQueryService,
          useValue: jasmine.createSpyObj('UserQueryService', ['getFollowersWithFollowers'])
        }
      ]
    });

    effects = TestBed.inject(SelectedUserFollowersEffects);
    userQueryService = TestBed.inject(UserQueryService);
  });

  it('should dispatch LoadSelectedUserFollowers action when LoadSelectedUser action is dispatched', () => {
    userQueryService.getFollowersWithFollowers.and.returnValue(of(exampleFollowersData));

    actions$ = of({
      type: selectedUserActions.SelectedUserActionTypes.LoadSelectedUser,
      payload: {
        selectedUserData: {
          followers_url: 'https://api.github.com/users/example/followers'
        }
      }
    });

    effects.loadSelectedUser$.subscribe(action => {
      expect(userQueryService.getFollowersWithFollowers).toHaveBeenCalledWith('https://api.github.com/users/example/followers');
      expect(action.type).toBe(selectedUserFollowersActions.SelectedUserFollowersActionTypes.LoadSelectedUserFollowers);
      expect(action.payload).toEqual({selectedUserFollowersData: exampleFollowersData});
    });
  });
});
