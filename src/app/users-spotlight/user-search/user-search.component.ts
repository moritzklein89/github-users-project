import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadUserQueryInput } from '../actions/user-query-input.actions';
import { LoadUserQueryResults } from '../actions/user-query-results.actions';
import { UserQueryResults } from '../models/user/user-query-results';
import { UsersSpotlightState } from '../reducers';
import { selectQueryError, selectUserQueryResults } from '../selectors/user.selectors';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  public userSearchForm: FormGroup;
  public queryError$: Observable<string>;
  public queryResults$: Observable<UserQueryResults>;

  constructor(private formBuilder: FormBuilder, private store: Store<UsersSpotlightState>) { }

  ngOnInit() {
    this.userSearchForm = this.formBuilder.group({
      userName: ''
    });
    this.queryResults$ = this.store.pipe(select(selectUserQueryResults));
    this.queryError$ = this.store.pipe(select(selectQueryError));
    this.store.dispatch(new LoadUserQueryResults({userQueryResultsData: null}));
  }

  onSubmit(userName: string) {
    this.store.dispatch(new LoadUserQueryResults({userQueryResultsData: null}));
    this.store.dispatch(new LoadUserQueryInput({userQueryInputData: userName}));
  }

}
