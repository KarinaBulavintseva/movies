import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MoviesService } from './movies.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  queryChanged$ = new BehaviorSubject<{ page: number; text: string }>({
    page: 1,
    text: '',
  });

  currentPage = 1;
  text = '';

  constructor(private moviesService: MoviesService) {}

  updatePageNumber(page: number) {
    this.currentPage = page;
    this.notifyQueryChanging();
  }

  updateTextForSearch(text: string) {
    this.text = text;
    this.notifyQueryChanging();
  }

  notifyQueryChanging() {
    this.queryChanged$.next({ page: this.currentPage, text: this.text });
    this.moviesService.clearFilterParams();
  }
}
