import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MoviesComponent } from './movies/movies.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MovieComponent } from './movies/movie/movie.conponent';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    MovieComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
