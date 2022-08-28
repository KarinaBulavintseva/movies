import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaginationOptions } from '../constants/PaginationConstants';
import { ActiveFilterParams, Filter } from '../interfaces/Filter';

@Injectable({
  providedIn: 'root',
})
export class DataManagingService {
  initialPage = PaginationOptions.INITIAL_PAGE;
  maxElementsNumber = PaginationOptions.MAX_MOVIES_NUMBER;

  currentPage = this.initialPage;
  activeFilterParams: ActiveFilterParams = {};
  option = '';

  private currentElementsNumber = this.maxElementsNumber;
  private genresList: number[] = [];

  private filterParamsObject: Filter = {
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

  selectNewOption(event: Event) {
    this.option = (<HTMLSelectElement>event.target).value;
    this.updateFilterParams();
  }

  filterGenres(checkedValue: number) {
    let isValueExist = this.genresList.includes(checkedValue);

    if (isValueExist) {
      this.genresList = this.genresList.filter((item) => item !== checkedValue);
      this.activeFilterParams[checkedValue] = false;
    } else {
      this.genresList.push(checkedValue);
      this.activeFilterParams[checkedValue] = true;
    }
    this.updateFilterParams();
  }

  private updateFilterParams() {
    this.currentPage = this.initialPage;
    this.emitFilterParamsChanging();
    this.pageChanged$.next(this.currentPage);
  }

  private emitFilterParamsChanging() {
    this.filterParamsObject.pageNumber = this.currentPage;
    this.filterParamsObject.genres = this.genresList;
    this.filterParamsObject.sortingOption = this.option;
    this.filterParamsChanged$.next(this.filterParamsObject);
  }
}
