import * as fromUserQueryInput from './user-query-input.actions';

describe('loadUserQueryInputs', () => {
  it('should return an action', () => {
    expect(fromUserQueryInput.loadUserQueryInputs().type).toBe('[UserQueryInput] Load UserQueryInputs');
  });
});
