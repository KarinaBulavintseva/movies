import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieDetails } from '../interfaces/interfaces';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  favouriteMoviesChanged$ = new Subject<MovieDetails[]>();
  userName = new Subject<string>();
  currentUserName = '';
  error = new Subject<string>();
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

    localStorage.setItem(this.currentUserName, JSON.stringify(favouriteMovies));
  }

  getMoviesFromLocalStorage() {
    const moviesFromLocalStorage = localStorage.getItem(this.currentUserName);
    if (moviesFromLocalStorage) {
      return JSON.parse(moviesFromLocalStorage);
    }
    return [];
  }

  signup(obj: User) {
    console.log('sign up');
    let usersArrayFromLS = localStorage.getItem('users');
    if (usersArrayFromLS) {
      const parsedArray: User[] = JSON.parse(usersArrayFromLS);
      const result = parsedArray.some((item) => item.username === obj.username);
      if (result) {
        this.error.next('User is already registered,please log in !');
      } else {
        parsedArray.push(obj);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        localStorage.setItem('users', JSON.stringify(parsedArray));
        this.currentUserName = obj.username;
        this.userName.next(obj.username);
      }
    } else {
      const arrayOfUsers = [obj];
      localStorage.setItem('currentUser', JSON.stringify(obj));
      localStorage.setItem('users', JSON.stringify(arrayOfUsers));
      this.currentUserName = obj.username;
      this.userName.next(obj.username);
    }
  }

  login(obj: User) {
    console.log('login');
    let usersArrayFromLS = localStorage.getItem('users');
    if (usersArrayFromLS) {
      const parsedArray: User[] = JSON.parse(usersArrayFromLS);
      const result = parsedArray.some(
        (item) =>
          item.username === obj.username && item.password === obj.password
      );
      console.log(result);
      if (result) {
        console.log('logged in succesfully');
        localStorage.setItem('currentUser', JSON.stringify(obj));
        this.currentUserName = obj.username;
        this.userName.next(obj.username);
      } else {
        this.error.next("There's invalid username or password !")
      }
    }
  }

  checkIfUserIsAuthorithed() {
    const userAuthorithed = localStorage.getItem('currentUser');
    if (userAuthorithed) {
      let userObject: User = JSON.parse(userAuthorithed);
      return userObject.username;
    }
    return '';
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.userName.next('');
  }
}
