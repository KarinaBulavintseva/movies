import { Injectable } from '@angular/core';
import { MoviesService } from './movies.service';
import { PaginationOptions } from '../constants/PaginationOptions';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  maxMoviesNumber = PaginationOptions.MAX_MOVIES_NUMBER;
  currentNumberOfMovies = this.maxMoviesNumber;

  constructor(
    private moviesService: MoviesService,
    private searchService: SearchService
  ) {}

  defineTotalMoviesNumber(collectionSize: number) {
    collectionSize >= this.maxMoviesNumber
      ? (this.currentNumberOfMovies = this.maxMoviesNumber)
      : (this.currentNumberOfMovies = collectionSize);

    this.moviesService.emitChangingNumberOfMovies(this.currentNumberOfMovies);
  }

  changePageNumber(page: number) {
    this.moviesService.emitPageChanging(page);
    this.searchService.updatePageNumber(page);
  }
}
