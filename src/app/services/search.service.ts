import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchParams } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchParamsChanged$ = new BehaviorSubject<SearchParams>({
    pageNumber: 1,
    text: '',
  });

  currentPage = 1;
  text = '';

  constructor() {}

  updateTextForSearch(text: string) {
    this.text = text;
    this.currentPage = 1;
    this.emitSearchParamsChanging();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.emitSearchParamsChanging();
  }

  emitSearchParamsChanging() {
    this.searchParamsChanged$.next({
      pageNumber: this.currentPage,
      text: this.text,
    });
  }
}
