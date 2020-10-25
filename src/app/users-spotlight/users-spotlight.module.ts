import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersSpotlightRoutingModule } from './users-spotlight-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersSpotlightReducers, metaReducers } from './reducers/index';
import { UserQueryResultsEffects } from './effects/user-query-results.effects';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  declarations: [UserSearchComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('users-spotlight', usersSpotlightReducers, { metaReducers }),
    EffectsModule.forFeature([UserQueryResultsEffects]),
    UsersSpotlightRoutingModule
  ]
})
export class UsersSpotlightModule { }
