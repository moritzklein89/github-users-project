import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersSpotlightRoutingModule } from './users-spotlight-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { reducers, metaReducers } from './reducers/index';
import { UserQueryResultsEffects } from './effects/user-query-results.effects';
import { UsersSpotlightComponent } from './users-spotlight.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SelectedUserFollowersEffects } from './effects/selected-user-followers.effects';

@NgModule({
  declarations: [UserSearchComponent, UsersSpotlightComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('users-spotlight', reducers, { metaReducers }),
    EffectsModule.forFeature([UserQueryResultsEffects, SelectedUserFollowersEffects]),
    UsersSpotlightRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    FontAwesomeModule,
    NgxChartsModule
  ]
})
export class UsersSpotlightModule { }
