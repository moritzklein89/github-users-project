import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { SelectedUserFollowersEffects } from './selected-user-followers.effects';
import { UserQueryService } from '../services/user-query.service';
import { User, UserWithFollowers } from '../models/user/user';
import * as selectedUserActions from '../actions/selected-user.actions';
import * as selectedUserFollowersActions from '../actions/selected-user-followers.actions';


fdescribe('SelectedUserFollowersEffects', () => {
  let actions$: Observable<Action>;
  let effects: SelectedUserFollowersEffects;
  let userQueryService;

  const exampleUser: User = {
    login: 'example',
    id: 57936,
    node_id: 'MDQ6VXNlcjU3OTM2',
    avatar_url: 'https://avatars1.githubusercontent.com/u/57936?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/example',
    html_url: 'https://github.com/example',
    followers_url: 'https://api.github.com/users/example/followers',
    following_url: 'https://api.github.com/users/example/following{/other_user}',
    gists_url: 'https://api.github.com/users/example/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/example/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/example/subscriptions',
    organizations_url: 'https://api.github.com/users/example/orgs',
    repos_url: 'https://api.github.com/users/example/repos',
    events_url: 'https://api.github.com/users/example/events{/privacy}',
    received_events_url: 'https://api.github.com/users/example/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0
  };
  const exampleFollowersData: UserWithFollowers[] = [
    {
      login: 'test',
      id: 383316,
      node_id: 'MDQ6VXNlcjM4MzMxNg==',
      avatar_url: 'https://avatars3.githubusercontent.com/u/383316?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/test',
      html_url: 'https://github.com/test',
      followers_url: 'https://api.github.com/users/test/followers',
      following_url: 'https://api.github.com/users/test/following{/other_user}',
      gists_url: 'https://api.github.com/users/test/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/test/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/test/subscriptions',
      organizations_url: 'https://api.github.com/users/test/orgs',
      repos_url: 'https://api.github.com/users/test/repos',
      events_url: 'https://api.github.com/users/test/events{/privacy}',
      received_events_url: 'https://api.github.com/users/test/received_events',
      type: 'User',
      site_admin: false,
      score: 1.0,
      followers: [
        exampleUser
      ]
    }
  ];

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
      expect(action.type).toBe(selectedUserFollowersActions.SelectedUserFollowersActionTypes.LoadSelectedUserFollowers);
      expect(action.payload).toEqual({selectedUserFollowersData: exampleFollowersData});
    });
  });
});
