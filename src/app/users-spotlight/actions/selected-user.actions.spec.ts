import { exampleUser } from '../models/user/user';
import * as Actions from './selected-user.actions';

describe('loadSelectedUser Actions', () => {

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
