import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieDetails, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  favouriteMoviesChanged$ = new Subject<MovieDetails[]>();
  currentUsername = '';
  usernameChanged$ = new Subject<string>();
  errorMessageChanged$ = new Subject<string>();

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
    localStorage.setItem(this.currentUsername, JSON.stringify(favouriteMovies));
  }

  getMoviesFromLocalStorage() {
    const moviesFromLocalStorage = localStorage.getItem(this.currentUsername);
    return moviesFromLocalStorage ? JSON.parse(moviesFromLocalStorage) : [];
  }

  signup(user: User) {
    let isUserExist = false;

    let usersArray = this.getUsersFromLocalStorage();

    if (usersArray.length) {
      isUserExist = this.checkIfUserExist(usersArray, user);
    }

    if (isUserExist) {
      this.errorMessageChanged$.next(
        'You are already registered. Please log in !'
      );
    } else {
      usersArray.push(user);
      localStorage.setItem('users', JSON.stringify(usersArray));
      this.setCurrentUser(user);
    }
  }

  login(user: User) {
    const usersArray = this.getUsersFromLocalStorage();

    const isUserExist = this.checkIfUserExist(usersArray, user);

    if (isUserExist) {
      this.setCurrentUser(user);
    } else {
      this.errorMessageChanged$.next('Invalid username or password !');
    }
  }

  setCurrentUser(currentUser: User) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.currentUsername = currentUser.username;
    this.usernameChanged$.next(currentUser.username);
  }

  getUsersFromLocalStorage() {
    const usersFromLocalStorage = localStorage.getItem('users');
    if (usersFromLocalStorage) {
      return JSON.parse(usersFromLocalStorage);
    }
    return [];
  }

  checkIfUserExist(usersArray: User[], user: User) {
    return usersArray.some(
      (item) =>
        item.username === user.username && item.password === user.password
    );
  }

  getUsername() {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        let authorithedUser: User = JSON.parse(currentUser);
        return authorithedUser.username;
      }
      return '';
    }


  checkIfUserAuthenticated() {
    return !!localStorage.getItem('currentUser');
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.usernameChanged$.next('');
  }
}
