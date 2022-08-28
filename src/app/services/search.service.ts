import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginationOptions } from '../constants/PaginationConstants';
import { SearchParams } from '../interfaces/Search';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  currentPage = PaginationOptions.INITIAL_PAGE;
  text = '';

  searchParamsChanged$ = new BehaviorSubject<SearchParams>({
    pageNumber: this.currentPage,
    text: '',
  });

  constructor() {}

  updateTextForSearch(text: string) {
    this.text = text;
    this.currentPage = PaginationOptions.INITIAL_PAGE;
    this.emitSearchParamsChanging();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.emitSearchParamsChanging();
  }

  private emitSearchParamsChanging() {
    this.searchParamsChanged$.next({
      pageNumber: this.currentPage,
      text: this.text,
    });
  }
}
