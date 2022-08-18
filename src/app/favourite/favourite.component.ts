import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDetails } from '../interfaces/interfaces';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit, OnDestroy {
  favouriteMovies: MovieDetails[] = [];
  subscription = new Subscription();

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.favouriteMovies = this.localStorageService.getMoviesFromLocalStorage();

    this.subscription.add(
      this.localStorageService.favouriteMoviesChanged$.subscribe(
        (changedMovies: MovieDetails[]) =>
          (this.favouriteMovies = changedMovies)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
