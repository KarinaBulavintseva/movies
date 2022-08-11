import { Injectable } from '@angular/core';
import { MoviesService } from './movies.service';
import { PaginationOptions } from '../constants/PaginationOptions';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  maxMoviesNumber = PaginationOptions.MAX_MOVIES_NUMBER;
  currentNumberOfMovies = this.maxMoviesNumber;

  constructor(private moviesService: MoviesService) {}

  defineTotalMoviesNumber(collectionSize: number) {
    if (collectionSize >= this.maxMoviesNumber) {
      this.currentNumberOfMovies = this.maxMoviesNumber;
    } else {
      this.currentNumberOfMovies = collectionSize;
    }
    this.moviesService.emitChangingNumberOfMovies(this.currentNumberOfMovies);
  }

  changePage(page: number) {
    this.moviesService.emitPageChanging(page);
  }
}
