import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserQueryService } from './user-query.service';
import { exampleQueryResults } from '../models/user/user-query-results';
import { exampleFollowersData, exampleUser, exampleFullUser } from '../models/user/user';
import { of } from 'rxjs';

describe('UserQueryService', () => {
  let service: UserQueryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        UserQueryService,
      ]
    });
    service = TestBed.inject(UserQueryService);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve queryResults given a query input', () => {
    service.getUsers('example').subscribe(queryResults => {
      expect(queryResults).toEqual(exampleQueryResults);
    });

    const request = httpMock.expectOne('https://api.github.com/search/users?q=example');
    expect(request.request.method).toBe('GET');
    request.flush(exampleQueryResults);
  });

  it('should retrieve a full user given a username', () => {
    service.getFullUser('test').subscribe(fullUser => {
      expect(fullUser).toEqual(exampleFullUser);
    });

    const request = httpMock.expectOne('https://api.github.com/users/test');
    expect(request.request.method).toBe('GET');
    request.flush(exampleFullUser);
  });

  it('should retrieve a followers list given a followersUrl', () => {
    service.getFollowers('https://api.github.com/users/example/followers').subscribe(followersData => {
      expect(followersData).toEqual([exampleUser]);
    });

    const request = httpMock.expectOne('https://api.github.com/users/example/followers');
    expect(request.request.method).toBe('GET');
    request.flush([exampleUser]);
  });

  it('should retrieve/create a followersWithFollowers list given a followersUrl', () => {
    spyOn(service, 'getFullUser').and.returnValue(of(exampleFullUser));
    service.getFollowersWithFollowers('https://api.github.com/users/test/followers')
    .subscribe(followersWithFollowers => {
      expect(followersWithFollowers).toEqual(exampleFollowersData);
    });

    const request = httpMock.expectOne('https://api.github.com/users/test/followers');
    expect(request.request.method).toBe('GET');
    request.flush([exampleUser]);
  });

});
