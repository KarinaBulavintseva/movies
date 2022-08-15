import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteComponent } from './favourite/favourite.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  // { path: '', redirectTo: '/movies' },
  { path: '', component: MoviesComponent },
  { path: 'favourite', component: FavouriteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
