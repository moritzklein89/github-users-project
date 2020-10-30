import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { UserQueryResults } from '../models/user/user-query-results';
import { FullUser, User } from '../models/user/user';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserQueryService {
  private githubApiSearchUrl = 'https://api.github.com/search/users';
  private githubApiUsersUrl = 'https://api.github.com/users/';
  private followersWithFollowersLimit = 10;

  constructor(private http: HttpClient) { }

  getUsers(queryInput: string): Observable<UserQueryResults> {
    return this.http.get<UserQueryResults>(this.githubApiSearchUrl + '?q=' + queryInput);
  }

  getUser(userName: string): Observable<FullUser> {
    return this.http.get<FullUser>(this.githubApiUsersUrl + userName);
  }

  getFollowers(followersUrl: string): Observable<User[]> {
    return this.http.get<User[]>(followersUrl);
  }

  getFollowersWithFollowers(followersUrl: string): Observable<FullUser[]> {
    const followersWithFollowersObservables: Array<Observable<FullUser>> = [];

    return this.http.get<User[]>(followersUrl).pipe(
      mergeMap(followers => {
        followers.slice(0, this.followersWithFollowersLimit).forEach(follower => {
          followersWithFollowersObservables.push(
            this.getUser(follower.login)
          );
        });
        return forkJoin(followersWithFollowersObservables);
      })
    );
  }
}
