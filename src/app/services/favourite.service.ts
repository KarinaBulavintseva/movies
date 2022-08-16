import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieDetails } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  favouriteMoviesChanged$ = new Subject<MovieDetails[]>();

  constructor() {}

  checkIfMovieIsInLocalStorage(movieObject: MovieDetails) {
    let isMovieInLocalStorage = false;
    const moviesFromLocalStorage = this.getMoviesFromLocalStorage();

    for (let item of moviesFromLocalStorage) {
      if (movieObject.id === item.id) {
        isMovieInLocalStorage = true;
      }
    }

    return isMovieInLocalStorage;
  }

  removeOrAddMovie(isMovieFavourite: boolean, movieObject: MovieDetails) {
    let favouriteMovies: MovieDetails[] = this.getMoviesFromLocalStorage();

    if (isMovieFavourite) {
      favouriteMovies.push(movieObject);
    } else {
      const index = favouriteMovies.findIndex(
        (item) => (item.id = movieObject.id)
      );

      if (index !== -1) {
        favouriteMovies.splice(index, 1);
      }
    }
    this.favouriteMoviesChanged$.next(favouriteMovies);

    localStorage.setItem(`favourite`, JSON.stringify(favouriteMovies));
  }

  getMoviesFromLocalStorage() {
    const moviesFromLocalStorage = localStorage.getItem(`favourite`);
    if (moviesFromLocalStorage) {
      return JSON.parse(moviesFromLocalStorage);
    }
    return [];
  }
}
