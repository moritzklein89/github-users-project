import * as fromUserQueryResults from './user-query-results.actions';

describe('loadUserQueryResultss', () => {
  it('should return an action', () => {
    expect(fromUserQueryResults.loadUserQueryResultss().type).toBe('[UserQueryResults] Load UserQueryResultss');
  });
});
