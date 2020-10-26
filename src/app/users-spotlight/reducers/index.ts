import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer, props } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { UserQueryResults } from '../models/user/user-query-results';
import { UserQueryInputActionTypes, UserQueryInputAction } from '../actions/user-query-input.actions';
import { UserQueryResultsActionTypes, UserQueryResultsAction} from '../actions/user-query-results.actions';
import { User } from '../models/user/user';

export interface UserQueryResultsState {
  userQueryResultsData: UserQueryResults| null;
}

const initialUserQueryResultsState: UserQueryResultsState = {
  userQueryResultsData: null
};

export interface UserQueryInputState {
  userQueryInputData: string| null;
  error: string| null;
}

const initialUserQueryInputState: UserQueryInputState = {
  userQueryInputData: null,
  error: null
};

export interface UsersSpotlightState {
  userQueryResults: UserQueryResultsState;
  userQueryInput: UserQueryInputState;
}

export function userQueryResultsReducer(
  state: UserQueryResultsState = initialUserQueryResultsState,
  action: UserQueryResultsAction
  ): UserQueryResultsState {
  switch (action.type) {
    case UserQueryResultsActionTypes.LoadUserQueryResults:
      return {
        userQueryResultsData: action.payload.userQueryResultsData
      };

    default:
      return state;
  }
}

export function userQueryInputReducer(
  state: UserQueryInputState = initialUserQueryInputState,
  action: UserQueryInputAction
  ): UserQueryInputState {
  switch (action.type) {
    case UserQueryInputActionTypes.LoadUserQueryInput:
      return {
        userQueryInputData: action.payload.userQueryInputData,
        error: null
      };

    case UserQueryInputActionTypes.UserQueryInputError:
      return {
        userQueryInputData: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<UsersSpotlightState> = {
  userQueryResults: userQueryResultsReducer,
  userQueryInput: userQueryInputReducer
};

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

export const metaReducers: MetaReducer<UsersSpotlightState>[] = !environment.production ? [] : [];
