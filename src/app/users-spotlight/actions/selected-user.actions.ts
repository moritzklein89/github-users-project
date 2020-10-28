import { Action } from '@ngrx/store';
import { User } from '../models/user/user';
// TODO add tests
export enum SelectedUserActionTypes {
  LoadSelectedUser = '[SelectedUser] Load SelectedUser',
  SelectedUserError = '[SelectedUser] SelectedUser Error'
}

export class SelectedUserAction implements Action {
  type: string;
  payload: {
    selectedUserData: User,
    error: string
  };
}

export class LoadSelectedUser implements Action {
  readonly type = SelectedUserActionTypes.LoadSelectedUser;

  constructor(readonly payload: {selectedUserData: User}) {

  }
}

export class SelectedUserError implements Action {
  readonly type = SelectedUserActionTypes.SelectedUserError;

  constructor(readonly payload: {error: string}) {

  }
}


export type ActionsUnion = LoadSelectedUser | SelectedUserError;
