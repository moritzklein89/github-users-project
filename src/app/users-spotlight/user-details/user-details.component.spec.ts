import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UserDetailsComponent } from './user-details.component';
import { User, UserWithFollowers } from '../models/user/user';
import { UsersSpotlightState } from '../reducers';
import { MemoizedSelector, select } from '@ngrx/store';
import { selectFollowersData, selectFollowersError, selectUser } from '../selectors/user.selectors';
import { LoadSelectedUserFollowers } from '../actions/selected-user-followers.actions';
import { LoadSelectedUser } from '../actions/selected-user.actions';
import { LoadUserQueryInput } from '../actions/user-query-input.actions';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let mockStore;
  let mockUserSelector: MemoizedSelector<UsersSpotlightState, User>;
  let mockFollowersDataSelector: MemoizedSelector<UsersSpotlightState, UserWithFollowers[]>;
  let mockFollowersErrorSelector: MemoizedSelector<UsersSpotlightState, string>;

  const mockQueryParamsObservable = of([{username: 'example'}]);
  const exampleUser: User = {
    login: 'example',
    id: 57936,
    node_id: 'MDQ6VXNlcjU3OTM2',
    avatar_url: 'https://avatars1.githubusercontent.com/u/57936?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/example',
    html_url: 'https://github.com/example',
    followers_url: 'https://api.github.com/users/example/followers',
    following_url: 'https://api.github.com/users/example/following{/other_user}',
    gists_url: 'https://api.github.com/users/example/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/example/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/example/subscriptions',
    organizations_url: 'https://api.github.com/users/example/orgs',
    repos_url: 'https://api.github.com/users/example/repos',
    events_url: 'https://api.github.com/users/example/events{/privacy}',
    received_events_url: 'https://api.github.com/users/example/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0
  };
  const exampleFollowersData: UserWithFollowers[] = [
    {
      login: 'test',
      id: 383316,
      node_id: 'MDQ6VXNlcjM4MzMxNg==',
      avatar_url: 'https://avatars3.githubusercontent.com/u/383316?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/test',
      html_url: 'https://github.com/test',
      followers_url: 'https://api.github.com/users/test/followers',
      following_url: 'https://api.github.com/users/test/following{/other_user}',
      gists_url: 'https://api.github.com/users/test/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/test/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/test/subscriptions',
      organizations_url: 'https://api.github.com/users/test/orgs',
      repos_url: 'https://api.github.com/users/test/repos',
      events_url: 'https://api.github.com/users/test/events{/privacy}',
      received_events_url: 'https://api.github.com/users/test/received_events',
      type: 'User',
      site_admin: false,
      score: 1.0,
      followers: [
        exampleUser
      ]
    }
  ];
  const exampleError = 'test-error';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      imports: [ NgxChartsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: mockQueryParamsObservable,
          },
        },
        provideMockStore()
      ]
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore);
    spyOn(mockStore, 'dispatch');

    mockUserSelector = mockStore.overrideSelector(selectUser, null);
    mockFollowersDataSelector = mockStore.overrideSelector(selectFollowersData, exampleFollowersData);
    mockFollowersErrorSelector = mockStore.overrideSelector(selectFollowersError, exampleError);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('initialization', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(UserDetailsComponent);
      component = fixture.componentInstance;
      spyOn(component, 'setupUserDataSubscription');
      spyOn(component, 'setupFollowersDataSubscription');
      spyOn(component, 'ngOnDestroy');
      fixture.detectChanges();
    });

    it('should create, configure the barChart, clear the followersData and listen for state changes', () => {
      expect(component).toBeTruthy();
      expect(component.barChartConfig).toEqual({
        showXAxis: true,
        showYAxis: true,
        gradient: false,
        showLegend: false,
        showXAxisLabel: false,
        xAxisLabel: '',
        showYAxisLabel: false,
        yAxisLabel: '',
        colorScheme: {domain: ['#007bff']},
        view: null
      });
      expect(mockStore.dispatch).toHaveBeenCalledWith(new LoadSelectedUserFollowers({selectedUserFollowersData: null}));
      expect(component.user$).toBeDefined();
      expect(component.followers$).toBeDefined();
      expect(component.followersError$).toBeDefined();
      expect(component.setupUserDataSubscription).toHaveBeenCalled();
      expect(component.setupFollowersDataSubscription).toHaveBeenCalled();
    });
  });

  describe('subscriptions', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(UserDetailsComponent);
      component = fixture.componentInstance;
      spyOn(component, 'ngOnInit');
      fixture.detectChanges();
    });

    it('should get userData if there is none', () => {
      component.user$ = mockStore.pipe(select(selectUser, 'example'));
      component.setupUserDataSubscription('example');

      expect(mockStore.dispatch).toHaveBeenCalledWith(new LoadUserQueryInput({userQueryInputData: 'example'}));
    });

    it('should select a user if it has the associated data', () => {
      mockUserSelector = mockStore.overrideSelector(selectUser, exampleUser);
      component.user$ = mockStore.pipe(select(selectUser, 'example'));
      component.setupUserDataSubscription('example');

      expect(mockStore.dispatch).toHaveBeenCalledWith(new LoadSelectedUser({selectedUserData: exampleUser}));
    });

    it('should listen for followersData, process and then inject it into the barChart', () => {
      component.setupFollowersDataSubscription();

      expect(component.barChartConfig.results).toEqual([{
        name: 'test',
        value: 1
      }]);
    });
  });

  describe('cleanup', () => {
    beforeEach(() => {
      spyOn(component.userDataSubscription, 'unsubscribe');
      spyOn(component.followersDataSubscription, 'unsubscribe');
    });

    it('should kill subscriptions when the component gets destroyed', () => {
      component.ngOnDestroy();

      expect(component.userDataSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.followersDataSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

});
