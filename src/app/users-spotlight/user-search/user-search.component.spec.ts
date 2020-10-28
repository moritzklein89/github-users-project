import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { UserSearchComponent } from './user-search.component';
import { MemoizedSelector } from '@ngrx/store';
import { UsersSpotlightState } from '../reducers';
import { UserQueryResults } from '../models/user/user-query-results';
import { selectQueryError, selectUserQueryResults } from '../selectors/user.selectors';
import { LoadUserQueryResults } from '../actions/user-query-results.actions';
import { LoadUserQueryInput } from '../actions/user-query-input.actions';

fdescribe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let mockStore: MockStore;
  let mockQueryResultsSelector: MemoizedSelector<UsersSpotlightState, UserQueryResults>;
  let mockQueryErrorSelector: MemoizedSelector<UsersSpotlightState, string>;

  const exampleQueryResults = {
    total_count: 0,
    incomplete_results: false,
    items: []
  };
  const exampleError = 'test-error';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchComponent ],
      imports: [ FormsModule, ReactiveFormsModule, NgbAlertModule ],
      providers: [
        provideMockStore(),
      ]
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore);
    spyOn(mockStore, 'dispatch');

    mockQueryResultsSelector = mockStore.overrideSelector(selectUserQueryResults, exampleQueryResults);
    mockQueryErrorSelector = mockStore.overrideSelector(selectQueryError, exampleError);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and clear the query results', () => {
    expect(component).toBeTruthy();
    expect(component.userSearchForm.value).toEqual({
      userName: ''
    });
    expect(component.queryResults$).toBeDefined();
    expect(component.queryError$).toBeDefined();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new LoadUserQueryResults({userQueryResultsData: null}));
  });

  it('should receive query results and errors', () => {
    component.queryResults$.subscribe(queryResults => {
      expect(queryResults).toEqual(exampleQueryResults);
    });
    component.queryError$.subscribe(queryError => {
      expect(queryError).toEqual(exampleError);
    });
  });

  it('should clear the query results, then execute a new query', () => {
    component.onSubmit('test');

    expect(mockStore.dispatch).toHaveBeenCalledWith(new LoadUserQueryResults({userQueryResultsData: null}));
    expect(mockStore.dispatch).toHaveBeenCalledWith(new LoadUserQueryInput({userQueryInputData: 'test'}));
  });
});
