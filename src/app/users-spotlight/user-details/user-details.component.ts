import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoadUserQueryInput } from '../actions/user-query-input.actions';
import { User } from '../models/user/user';
import { UsersSpotlightState, selectUser } from '../reducers';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;
  private userDataSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<UsersSpotlightState>) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user$ = this.store.pipe(select(selectUser, params.username));
      this.userDataSubscription = this.user$.subscribe(userData => {
        if (userData === null) {
          this.store.dispatch(new LoadUserQueryInput({userQueryInputData: params.username}));
        }
      });
    });
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }

}
