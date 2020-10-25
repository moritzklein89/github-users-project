import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserQueryResults } from '../models/user/user-query-results';

@Injectable({
  providedIn: 'root'
})
export class UserQueryService {
  private githubApiUrl = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) { }

  getUsers(queryInput: string): Observable<UserQueryResults> {
    return this.http.get<UserQueryResults>(this.githubApiUrl + '?q=' + queryInput);
  }
}
