import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadUserQueryInput } from '../actions/user-query-input.actions';
import { User } from '../models/user/user';
import { AppState, selectUser } from '../reducers';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  private user$: Observable<User>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user$ = this.store.pipe(select(selectUser, params.username));
      this.user$.subscribe(userData => {
        if (userData === null) {
          this.store.dispatch(new LoadUserQueryInput({userQueryInputData: params.username}));
        }
      });
    });
  }

}
