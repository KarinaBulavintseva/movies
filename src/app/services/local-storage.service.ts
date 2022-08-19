import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieDetails } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
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
      favouriteMovies = favouriteMovies.filter((item) =>
        item.id === movieObject.id ? false : true
      );
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
