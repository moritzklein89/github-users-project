import * as Actions from './user-query-results.actions';
import { exampleQueryResults } from '../models/user/user-query-results';

describe('loadUserQueryResults Actions', () => {
  it('should create a LoadUserQueryResults action', () => {
    const payload = { userQueryResultsData: exampleQueryResults };
    const action = new Actions.LoadUserQueryResults(payload);

    expect({ ...action }).toEqual({
      type: Actions.UserQueryResultsActionTypes.LoadUserQueryResults,
      payload
    });
  });
});
