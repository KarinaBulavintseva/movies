import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDetails } from '../interfaces/interfaces';
import { FavouriteService } from '../services/favourite.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit, OnDestroy {
  arrayOfFavouriteMovies: MovieDetails[] = [];
  subscription = new Subscription();

  constructor(
    private favouriteService: FavouriteService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.arrayOfFavouriteMovies =
      this.favouriteService.getMoviesFromLocalStorage();

    this.subscription.add(
      this.favouriteService.favouriteMoviesChanged$.subscribe(
        (changedMovies) => (this.arrayOfFavouriteMovies = changedMovies)
      )
    );

    this.moviesService.clearFilterParams();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
