import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginationOptions } from '../constants/PaginationConstants';
import { Filter } from '../interfaces/Filter';
import { PaginationParams } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root',
})
export class DataManagingService {
  initialPage = 1;
  currentPage = this.initialPage;
  maxElementsNumber = PaginationOptions.MAX_MOVIES_NUMBER;
  currentElementsNumber = this.maxElementsNumber;
  genresList: string[] = [];
  option = '';

  filterParamsChanged$ = new Subject<Filter>();

  pageAndMoviesNumberChanged$ = new Subject<PaginationParams>();

  filterParamsObject: Filter = {
    pageNumber: this.currentPage,
    genres: this.genresList,
    sortingOption: this.option,
  };

  constructor() {}

  defineTotalMoviesNumber(collectionSize: number) {
    collectionSize < this.maxElementsNumber
      ? (this.currentElementsNumber = collectionSize)
      : (this.currentElementsNumber = this.maxElementsNumber);

    this.emitPageAndMoviesNumberChanging();
  }

  changePageNumber(page: number) {
    this.currentPage = page;
    this.emitFilterParamsChanging();
  }

  updateFilterParams() {
    this.currentPage = this.initialPage;
    this.emitFilterParamsChanging();
    this.emitPageAndMoviesNumberChanging();
  }

  emitFilterParamsChanging() {
    this.filterParamsObject.pageNumber = this.currentPage;
    this.filterParamsObject.genres = this.genresList;
    this.filterParamsObject.sortingOption = this.option;
    this.filterParamsChanged$.next(this.filterParamsObject);
  }

  emitPageAndMoviesNumberChanging() {
    this.pageAndMoviesNumberChanged$.next({
      pageNumber: this.currentPage,
      moviesNumber: this.currentElementsNumber,
    });
  }

  clearOptions() {
    this.currentPage = this.initialPage;
    this.genresList = [];
    this.option = '';
    this.emitPageAndMoviesNumberChanging();
  }
}
