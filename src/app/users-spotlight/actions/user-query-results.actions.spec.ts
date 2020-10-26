import * as Actions from './user-query-results.actions';
import { UserQueryResults } from '../models/user/user-query-results';

describe('loadUserQueryResults Actions', () => {
  it('should create a LoadUserQueryResults action', () => {
    const exampleUserQueryResults: UserQueryResults = {
      total_count: 0,
      incomplete_results: false,
      items: []
    };
    const payload = { userQueryResultsData: exampleUserQueryResults };
    const action = new Actions.LoadUserQueryResults(payload);

    expect({ ...action }).toEqual({
      type: Actions.UserQueryResultsActionTypes.LoadUserQueryResults,
      payload
    });
  });
});
