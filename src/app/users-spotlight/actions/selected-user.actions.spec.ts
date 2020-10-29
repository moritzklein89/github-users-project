import { User } from '../models/user/user';
import * as Actions from './selected-user.actions';

describe('loadSelectedUser Actions', () => {
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

  it('should create a LoadSelectedUser action', () => {
    const payload = { selectedUserData: exampleUser };
    const action = new Actions.LoadSelectedUser(payload);

    expect({ ...action }).toEqual({
      type: Actions.SelectedUserActionTypes.LoadSelectedUser,
      payload
    });
  });

  it('should create a SelectedUserError action', () => {
    const payload = { error: 'test' };
    const action = new Actions.SelectedUserError(payload);

    expect({ ...action }).toEqual({
      type: Actions.SelectedUserActionTypes.SelectedUserError,
      payload
    });
  });
});
