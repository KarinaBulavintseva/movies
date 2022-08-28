import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { FavouriteGuard } from './favourite.guard';
import { FavouriteComponent } from './favourite/favourite.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';

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
    children:[
      {path:'login',component:LoginComponent},
      {path:'signup',component:SignupComponent},
      {path:'**',redirectTo:"login",pathMatch:'full'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
