import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSearchComponent } from './user-search/user-search.component';
import { UsersSpotlightComponent } from './users-spotlight.component';

const routes: Routes = [
  {
    path: '',
    component: UsersSpotlightComponent,
    children: [
      {
        path: 'search',
        component: UserSearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersSpotlightRoutingModule { }
