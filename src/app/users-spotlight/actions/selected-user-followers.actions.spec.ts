import * as Actions from './selected-user-followers.actions';
import { exampleFollowersData } from '../models/user/user';

fdescribe('loadSelectedUserFollowers Actions', () => {
  it('should create a LoadSelectedUserFollowers action', () => {
    const payload = { selectedUserFollowersData: exampleFollowersData };
    const action = new Actions.LoadSelectedUserFollowers(payload);

    expect({ ...action }).toEqual({
      type: Actions.SelectedUserFollowersActionTypes.LoadSelectedUserFollowers,
      payload
    });
  });
});
