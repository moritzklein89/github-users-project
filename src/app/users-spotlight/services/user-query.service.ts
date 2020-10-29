import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { UserQueryResults } from '../models/user/user-query-results';
import { User, UserWithFollowers } from '../models/user/user';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserQueryService {
  private githubApiUrl = 'https://api.github.com/search/users';
  private followersWithFollowersLimit = 10;

  constructor(private http: HttpClient) { }

  getUsers(queryInput: string): Observable<UserQueryResults> {
    return this.http.get<UserQueryResults>(this.githubApiUrl + '?q=' + queryInput);
  }

  getFollowers(followersUrl: string): Observable<User[]> {
    return this.http.get<User[]>(followersUrl);
  }

  getFollowersWithFollowers(followersUrl: string): Observable<UserWithFollowers[]> {
    const followersWithFollowersObservables: Array<Observable<UserWithFollowers>> = [];
    let followerWithFollowers: UserWithFollowers;

    return this.http.get<User[]>(followersUrl).pipe(
      mergeMap(followers => {
        followers.slice(0, this.followersWithFollowersLimit).forEach(follower => {
          followersWithFollowersObservables.push(
            this.getFollowers(follower.followers_url).pipe(
              map(subFollowers => {
                followerWithFollowers = follower;
                followerWithFollowers.followers = subFollowers;
                return followerWithFollowers;
              })
            )
          );
        });
        return forkJoin(followersWithFollowersObservables);
      })
    );
  }
}
