import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaginationOptions } from '../constants/PaginationConstants';
import { Filter } from '../interfaces/Filter';

@Injectable({
  providedIn: 'root',
})
export class DataManagingService {
  initialPage = 1;
  currentPage = this.initialPage;
  maxElementsNumber = PaginationOptions.MAX_MOVIES_NUMBER;
  currentElementsNumber = this.maxElementsNumber;
  genresList: number[] = [];
  option = '';

  filterParamsObject: Filter = {
    pageNumber: this.currentPage,
    genres: this.genresList,
    sortingOption: this.option,
  };

  filterParamsChanged$ = new BehaviorSubject<Filter>(this.filterParamsObject);
  pageChanged$ = new Subject<number>();
  moviesNumberChanged$ = new BehaviorSubject<number>(this.maxElementsNumber);

  constructor() {}

  defineTotalMoviesNumber(collectionSize: number) {
    collectionSize < this.maxElementsNumber
      ? (this.currentElementsNumber = collectionSize)
      : (this.currentElementsNumber = this.maxElementsNumber);

    this.moviesNumberChanged$.next(this.currentElementsNumber);
  }

  changePageNumber(page: number) {
    this.currentPage = page;
    this.emitFilterParamsChanging();
  }

  updateFilterParams() {
    this.currentPage = this.initialPage;
    this.emitFilterParamsChanging();
    this.pageChanged$.next(this.currentPage);
  }

  emitFilterParamsChanging() {
    this.filterParamsObject.pageNumber = this.currentPage;
    this.filterParamsObject.genres = this.genresList;
    this.filterParamsObject.sortingOption = this.option;
    this.filterParamsChanged$.next(this.filterParamsObject);
  }
}
