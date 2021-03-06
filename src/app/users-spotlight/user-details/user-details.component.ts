import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, Subscription } from 'rxjs';
import { LoadSelectedUserFollowers } from '../actions/selected-user-followers.actions';
import { LoadSelectedUser } from '../actions/selected-user.actions';
import { LoadUserQueryInput } from '../actions/user-query-input.actions';
import { BarChartConfig, BarChartData } from '../models/bar-chart/bar-chart';
import { User, FullUser } from '../models/user/user';
import { UsersSpotlightState } from '../reducers';
import { selectFollowersData, selectFollowersError, selectUser } from '../selectors/user.selectors';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;
  public followers$: Observable<FullUser[]>;
  public followersError$: Observable<string>;
  public barChartConfig: BarChartConfig = {
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
  };
  public userDataSubscription: Subscription;
  public followersDataSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<UsersSpotlightState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadSelectedUserFollowers({ selectedUserFollowersData: null }));
    this.route.queryParams.subscribe(params => {
      this.user$ = this.store.pipe(select(selectUser, params.username));
      this.followers$ = this.store.pipe(select(selectFollowersData));
      this.followersError$ = this.store.pipe(select(selectFollowersError));
      this.setupUserDataSubscription(params.username);
      this.setupFollowersDataSubscription();
    });
  }

  setupUserDataSubscription(userName: string) {
    this.userDataSubscription = this.user$.subscribe(userData => {
      if (userData === null) {
        this.store.dispatch(new LoadUserQueryInput({ userQueryInputData: userName }));
      } else if (userData) {
        this.store.dispatch(new LoadSelectedUser({ selectedUserData: userData }));
      }
    });
  }

  setupFollowersDataSubscription() {
    this.followersDataSubscription = this.followers$.subscribe(followersData => {
      const barChartData: BarChartData[] = [];
      if (followersData) {
        followersData.forEach(follower => {
          barChartData.push({
            name: follower.login,
            value: follower.followers
          });
        });
      }
      this.barChartConfig.results = barChartData;
    });
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
    if (this.followersDataSubscription) {
      this.followersDataSubscription.unsubscribe();
    }
  }

}
