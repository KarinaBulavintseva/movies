import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Filter } from '../interfaces/Filter';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  currentPage = 1;
  initialPageNumber = 1;

  pageAndItemsNumberChanged$ = new Subject<{
    pageNumber: number;
    elementsNumber: number;
  }>();

  filterObject: Filter = {
    option: '',
    genre: [''],
    page: this.currentPage,
  };
  filterValuesChanged$ = new Subject<Filter>();

  constructor() {}

  recieveChangesOfParams(selectedValue: string, selectedGenres: Array<string>) {
    this.currentPage = this.initialPageNumber;
    this.filterObject.option = selectedValue;
    this.filterObject.genre = selectedGenres;
    this.emitFilterValuesChanged();
  }

  emitFilterValuesChanged() {
    this.filterObject.page = this.currentPage;
    this.filterValuesChanged$.next(this.filterObject);
  }

  emitPageChanging(page: number) {
    this.currentPage = page;
    this.emitFilterValuesChanged();
  }

  emitChangingNumberOfMovies(elementsNumber: number) {
    this.pageAndItemsNumberChanged$.next({
      pageNumber: this.currentPage,
      elementsNumber: elementsNumber,
    });
  }

  clearFilterParams() {
    this.filterObject.genre = [''];
    this.filterObject.option = '';
  }
}
