import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { UserQueryResults } from '../models/user/user-query-results';
import { FullUser, User } from '../models/user/user';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserQueryService {
  private githubApiUrl = environment.githubApiUrl;
  private followersWithFollowersLimit = 10;

  constructor(private http: HttpClient) { }

  getUsers(queryInput: string): Observable<UserQueryResults> {
    return this.http.get<UserQueryResults>(`${this.githubApiUrl}/search/users?q=${queryInput}`);
  }

  getFullUser(userName: string): Observable<FullUser> {
    return this.http.get<FullUser>(`${this.githubApiUrl}/users/${userName}`);
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
            this.getFullUser(follower.login)
          );
        });
        return forkJoin(followersWithFollowersObservables);
      })
    );
  }
}
