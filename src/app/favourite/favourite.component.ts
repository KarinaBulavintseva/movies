import { Component, OnInit } from '@angular/core';
import { MovieDetails } from '../interfaces/interfaces';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
  arrayOfFavouriteMovies: MovieDetails[] = [];

  constructor(private favouriteService: FavouriteService) {}

  ngOnInit(): void {
    this.arrayOfFavouriteMovies =
      this.favouriteService.getMoviesFromLocalStorage();

    this.favouriteService.favoriteMovies$.subscribe(
      (res) => (this.arrayOfFavouriteMovies = res)
    );
  }
}
