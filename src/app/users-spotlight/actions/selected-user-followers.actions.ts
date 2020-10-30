import { Action } from '@ngrx/store';
import { FullUser } from '../models/user/user';

export enum SelectedUserFollowersActionTypes {
  LoadSelectedUserFollowers = '[SelectedUserFollowers] Load SelectedUserFollowers'
}

export class SelectedUserFollowersAction implements Action {
  type: string;
  payload: {
    selectedUserFollowersData: FullUser[];
  };
}

export class LoadSelectedUserFollowers implements Action {
  readonly type = SelectedUserFollowersActionTypes.LoadSelectedUserFollowers;

  constructor(readonly payload: {selectedUserFollowersData: FullUser[]}) {

  }
}


export type SelectedUserFollowersActions = LoadSelectedUserFollowers;
