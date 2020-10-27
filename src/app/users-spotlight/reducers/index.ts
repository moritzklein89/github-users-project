import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { UserQueryResults } from '../models/user/user-query-results';
import { UserQueryInputActionTypes, UserQueryInputAction } from '../actions/user-query-input.actions';
import { UserQueryResultsActionTypes, UserQueryResultsAction} from '../actions/user-query-results.actions';
import { User, UserWithFollowers } from '../models/user/user';

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

export interface SelectedUserState {
  selectedUserData: User| null;
  error: string| null;
}

const initialSelectedUserState: SelectedUserState = {
  selectedUserData: null,
  error: null
};

export interface UserFollowerDataState {
  followerData: UserWithFollowers[]| null;
}

const initialUserFollowerDataState: UserFollowerDataState = {
  followerData: null
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

export const metaReducers: MetaReducer<UsersSpotlightState>[] = !environment.production ? [] : [];
