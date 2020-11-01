import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UserDetailsComponent } from './user-details.component';
import { User, FullUser, exampleUser, exampleFollowersData } from '../models/user/user';
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
  let mockFollowersDataSelector: MemoizedSelector<UsersSpotlightState, FullUser[]>;
  let mockFollowersErrorSelector: MemoizedSelector<UsersSpotlightState, string>;

  const mockQueryParamsObservable = of([{ username: 'example' }]);
  const exampleError = 'test-error';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [NgxChartsModule],
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
        colorScheme: { domain: ['#007bff'] },
        view: null
      });
      expect(mockStore.dispatch).toHaveBeenCalledWith(new LoadSelectedUserFollowers({ selectedUserFollowersData: null }));
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

      expect(mockStore.dispatch).toHaveBeenCalledWith(new LoadUserQueryInput({ userQueryInputData: 'example' }));
    });

    it('should select a user if it has the associated data', () => {
      mockUserSelector = mockStore.overrideSelector(selectUser, exampleUser);
      component.user$ = mockStore.pipe(select(selectUser, 'example'));
      component.setupUserDataSubscription('example');

      expect(mockStore.dispatch).toHaveBeenCalledWith(new LoadSelectedUser({ selectedUserData: exampleUser }));
    });

    it('should listen for followersData, process and then inject it into the barChart', () => {
      component.setupFollowersDataSubscription();

      expect(component.barChartConfig.results).toEqual([{
        name: 'test',
        value: 24
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
