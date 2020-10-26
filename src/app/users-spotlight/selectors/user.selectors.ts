import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/user/user';
import { UsersSpotlightState } from '../reducers';

export const selectUsersSpotlight = createFeatureSelector<UsersSpotlightState>('users-spotlight');

export const selectQueryError = createSelector(
  selectUsersSpotlight,
  (state: UsersSpotlightState) => state.userQueryInput.error
);

export const selectUserQueryResults = createSelector(
  selectUsersSpotlight,
  (state: UsersSpotlightState) => state.userQueryResults.userQueryResultsData
);

export const selectUser = createSelector(
  selectUsersSpotlight,
  (state: UsersSpotlightState, username: string) => {
    let foundUser: User = null;
    if (state.userQueryResults.userQueryResultsData) {
      foundUser = state.userQueryResults.userQueryResultsData.items.find(user => user.login === username);
    }
    return foundUser;
  }
);
