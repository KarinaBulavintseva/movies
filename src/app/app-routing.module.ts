import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { FavouriteGuard } from './favourite.guard';
import { FavouriteComponent } from './favourite/favourite.component';
import { MoviesComponent } from './movies/movies.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  {
    path: 'favourite',
    component: FavouriteComponent,
    canActivate: [FavouriteGuard],
  },
  { path: 'search', component: SearchComponent },
  {
    path: 'authentication',
    component: AuthenticationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
