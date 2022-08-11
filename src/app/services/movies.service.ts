import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filter } from '../interfaces/Filter';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  currentPage = 1;
  initialPageNumber = 1;

  filterValuesChanged$ = new Subject<Filter>();
  pageAndItemsNumberChanged$ = new Subject<{
    page: number;
    elementsNubmer: number;
  }>();

  filterObject: Filter = {
    option: '',
    genre: [''],
    page: this.currentPage,
    searchText: '',
  };

  constructor() {}

  recieveChangesOfParams(selectedValue: string, selectedGenres: Array<string>) {
    this.currentPage = this.initialPageNumber;
    this.filterObject.option = selectedValue;
    this.filterObject.genre = selectedGenres;
    this.emitFilterValuesChanged();
  }

  recieveSearchQueries(text: string) {
    this.currentPage = this.initialPageNumber;
    this.filterObject.searchText = text;
    this.filterObject.genre = [''];
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
      page: this.currentPage,
      elementsNubmer: elementsNumber,
    });
  }
}
