import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MoviesService } from './movies.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private moviesService: MoviesService) {}

  isFilterPanelToggle$ = new Subject<boolean>();

  searchMovies(inputText: string) {
    this.moviesService.recieveSearchQueries(inputText);

    if (inputText === '') {
      this.isFilterPanelToggle$.next(true);
    } else {
      this.isFilterPanelToggle$.next(false);
    }
  }
}
