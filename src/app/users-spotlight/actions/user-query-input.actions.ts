import { Action } from '@ngrx/store';

export enum UserQueryInputActionTypes {
  LoadUserQueryInput = '[UserQueryInput] Load UserQueryInput',
  UserQueryInputError = '[UserQueryInput] UserQueryInput Error'
}

export class UserQueryInputAction implements Action {
  type: string;
  payload: {
    userQueryInputData: string,
    error: string
  };
}

export class LoadUserQueryInput implements Action {
  readonly type = UserQueryInputActionTypes.LoadUserQueryInput;

  constructor(readonly payload: {userQueryInputData: string}) {

  }
}

export class UserQueryInputError implements Action {
  readonly type = UserQueryInputActionTypes.UserQueryInputError;

  constructor(readonly payload: {error: string}) {

  }
}


export type ActionsUnion = LoadUserQueryInput | UserQueryInputError;
