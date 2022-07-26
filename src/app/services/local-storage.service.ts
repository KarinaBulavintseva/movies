import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieDetails } from '../interfaces/Movie';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  currentUsername = '';

  usernameChanged$ = new Subject<string>();
  errorMessageChanged$ = new Subject<string>();
  favouriteMoviesChanged$ = new Subject<MovieDetails[]>();

  constructor() {}

  checkIfMovieIsInLocalStorage(movieObject: MovieDetails): boolean {
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

  getMoviesFromLocalStorage(): MovieDetails[] {
    const moviesFromLocalStorage = localStorage.getItem(this.currentUsername);
    return moviesFromLocalStorage ? JSON.parse(moviesFromLocalStorage) : [];
  }

  signup(user: User) {
    let isUserExist = false;

    let usersArray = this.getUsersFromLocalStorage();

    if (usersArray.length) {
      isUserExist = this.checkIfUserRegistered(usersArray, user);
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

  private setCurrentUser(currentUser: User) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.currentUsername = currentUser.username;
    this.usernameChanged$.next(currentUser.username);
  }

  private getUsersFromLocalStorage(): User[] {
    const usersFromLocalStorage = localStorage.getItem('users');
    if (usersFromLocalStorage) {
      return JSON.parse(usersFromLocalStorage);
    }
    return [];
  }

  private checkIfUserExist(usersArray: User[], user: User) {
    return usersArray.some(
      (item) =>
        item.username === user.username && item.password === user.password
    );
  }

  private checkIfUserRegistered(usersArray: User[], user: User) {
    return usersArray.some((item) => item.username === user.username);
  }

  getUsername(): string {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      let authorithedUser: User = JSON.parse(currentUser);
      return authorithedUser.username;
    }
    return '';
  }

  checkIfUserAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.usernameChanged$.next('');
  }
}
