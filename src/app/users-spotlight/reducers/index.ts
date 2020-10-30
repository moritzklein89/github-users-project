import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { UserQueryResults } from '../models/user/user-query-results';
import { UserQueryInputActionTypes, UserQueryInputAction } from '../actions/user-query-input.actions';
import { UserQueryResultsActionTypes, UserQueryResultsAction} from '../actions/user-query-results.actions';
import { User, FullUser } from '../models/user/user';
import { SelectedUserAction, SelectedUserActionTypes } from '../actions/selected-user.actions';
import { SelectedUserFollowersAction, SelectedUserFollowersActionTypes } from '../actions/selected-user-followers.actions';

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

export interface SelectedUserFollowersState {
  selectedUserFollowersData: FullUser[]| null;
}

const initialSelectedUserFollowersState: SelectedUserFollowersState = {
  selectedUserFollowersData: null
};

export interface UsersSpotlightState {
  userQueryInput: UserQueryInputState;
  userQueryResults: UserQueryResultsState;
  selectedUser: SelectedUserState;
  selectedUserFollowers: SelectedUserFollowersState;
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

export function selectedUserFollowersReducer(
  state: SelectedUserFollowersState = initialSelectedUserFollowersState,
  action: SelectedUserFollowersAction
  ): SelectedUserFollowersState {
  switch (action.type) {
    case SelectedUserFollowersActionTypes.LoadSelectedUserFollowers:
      return {
        selectedUserFollowersData: action.payload.selectedUserFollowersData
      };

    default:
      return state;
  }
}

export function selectedUserReducer(
  state: SelectedUserState = initialSelectedUserState,
  action: SelectedUserAction
  ): SelectedUserState {
  switch (action.type) {
    case SelectedUserActionTypes.LoadSelectedUser:
      return {
        selectedUserData: action.payload.selectedUserData,
        error: null
      };

    case SelectedUserActionTypes.SelectedUserError:
      return {
        selectedUserData: null,
        error: action.payload.error
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
  userQueryInput: userQueryInputReducer,
  selectedUser: selectedUserReducer,
  selectedUserFollowers: selectedUserFollowersReducer
};

export const metaReducers: MetaReducer<UsersSpotlightState>[] = !environment.production ? [] : [];
