import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { UserQueryResults } from '../models/user/user-query-results';
import { UserQueryInputActionTypes, UserQueryInputAction } from '../actions/user-query-input.actions';
import { UserQueryResultsActionTypes, UserQueryResultsAction} from '../actions/user-query-results.actions';

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

export interface AppState {
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

export const usersSpotlightReducers: ActionReducerMap<AppState> = {
  userQueryResults: userQueryResultsReducer,
  userQueryInput: userQueryInputReducer
};

export const selectUserQueryResults = (state: AppState) => state.userQueryResults.userQueryResultsData;

export const selectError = (state: AppState) => state.userQueryInput.error;

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
