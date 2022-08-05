import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MoviesService } from './movies.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private moviesService: MoviesService) {}

  isFilterPanel$ = new Subject<boolean>();

  searchMovies(inputText: string) {
    this.moviesService.currentPage = this.moviesService.initialPageNumber;
    this.moviesService.filterObj.searchText = inputText;
    this.moviesService.onSend();
    if (inputText === '') {
      this.isFilterPanel$.next(true);
    } else {
      this.isFilterPanel$.next(false);
    }
  }
}
