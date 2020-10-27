import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, Subscription } from 'rxjs';
import { LoadSelectedUser } from '../actions/selected-user.actions';
import { LoadUserQueryInput } from '../actions/user-query-input.actions';
import { BarChartConfig, BarChartData } from '../models/user/bar-chart';
import { User, UserWithFollowers } from '../models/user/user';
import { UsersSpotlightState } from '../reducers';
import { selectFollowersData, selectUser } from '../selectors/user.selectors';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;
  public followers$: Observable<UserWithFollowers[]>;
  public barChartConfig: BarChartConfig = {
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: false,
    showXAxisLabel: false,
    xAxisLabel: '',
    showYAxisLabel: false,
    yAxisLabel: '',
    colorScheme: {domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']},
    view: null
  };
  private userDataSubscription: Subscription;
  private followersDataSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<UsersSpotlightState>) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user$ = this.store.pipe(select(selectUser, params.username));
      this.followers$ = this.store.pipe(select(selectFollowersData));
      this.setupUserDataSubscription(params.username);
      this.setupFollowersDataSubscription();
    });
  }

  setupUserDataSubscription(userName: string) {
    this.userDataSubscription = this.user$.subscribe(userData => {
      if (userData === null) {
        this.store.dispatch(new LoadUserQueryInput({userQueryInputData: userName}));
      }
      if (userData) {
        this.store.dispatch(new LoadSelectedUser({selectedUserData: userData}));
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
            value: follower.followers.length
          });
        });
      }
      this.barChartConfig.results = barChartData;
    });
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
    this.followersDataSubscription.unsubscribe();
  }

}
