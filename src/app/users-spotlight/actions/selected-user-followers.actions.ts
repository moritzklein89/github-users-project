import { Action } from '@ngrx/store';
import { UserWithFollowers } from '../models/user/user';
// TODO add tests
export enum SelectedUserFollowersActionTypes {
  LoadSelectedUserFollowers = '[SelectedUserFollowers] Load SelectedUserFollowers'
}

export class SelectedUserFollowersAction implements Action {
  type: string;
  payload: {
    selectedUserFollowersData: UserWithFollowers[];
  };
}

export class LoadSelectedUserFollowers implements Action {
  readonly type = SelectedUserFollowersActionTypes.LoadSelectedUserFollowers;

  constructor(readonly payload: {selectedUserFollowersData: UserWithFollowers[]}) {

  }
}


export type SelectedUserFollowersActions = LoadSelectedUserFollowers;
