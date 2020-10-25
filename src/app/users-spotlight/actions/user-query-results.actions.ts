import { Action } from '@ngrx/store';
import { UserQueryResults } from '../models/user/user-query-results';

export enum UserQueryResultsActionTypes {
  LoadUserQueryResults = '[UserQueryResults] Load UserQueryResults'
}

export class UserQueryResultsAction implements Action {
  type: string;
  payload: {
    userQueryResultsData: UserQueryResults
  };
}

export class LoadUserQueryResults implements Action {
  readonly type = UserQueryResultsActionTypes.LoadUserQueryResults;

  constructor(readonly payload: {userQueryResultsData: UserQueryResults}) {

  }
}


export type UserQueryResultsActions = LoadUserQueryResults;
