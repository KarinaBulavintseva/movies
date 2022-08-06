import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filter } from '../interfaces/Filter';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  currentPage = 1;
  maxNumberOfPages = 100;
  initialPageNumber = 1;

  valuesChanged$ = new Subject<Filter>();

  filterObj: Filter = {
    option: '',
    genre: [''],
    page: this.currentPage,
    searchText: '',
  };

  constructor() {}

  recieveChangesOfParams(selectedValue: string, selectedGenres: Array<string>) {
    this.currentPage = this.initialPageNumber;
    this.filterObj.option = selectedValue;
    this.filterObj.genre = selectedGenres;
    this.emitValuesChanged();
  }

  recieveSearchQueries(text: string) {
    this.currentPage = this.initialPageNumber;
    this.filterObj.searchText = text;
    this.emitValuesChanged();
  }

  emitValuesChanged() {
    this.filterObj.page = this.currentPage;
    this.valuesChanged$.next(this.filterObj);
  }
}
