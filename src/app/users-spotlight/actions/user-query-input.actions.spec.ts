import * as Actions from './user-query-input.actions';

describe('loadUserQueryInput Actions', () => {
  it('should create a LoadUserQueryInput action', () => {
    const payload = { userQueryInputData: 'test' };
    const action = new Actions.LoadUserQueryInput(payload);

    expect({ ...action }).toEqual({
      type: Actions.UserQueryInputActionTypes.LoadUserQueryInput,
      payload
    });
  });

  it('should create a UserQueryInputError action', () => {
    const payload = { error: 'test' };
    const action = new Actions.UserQueryInputError(payload);

    expect({ ...action }).toEqual({
      type: Actions.UserQueryInputActionTypes.UserQueryInputError,
      payload
    });
  });
});
