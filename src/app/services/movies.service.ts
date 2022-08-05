import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filter } from '../interfaces/Filter';

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

  onSend() {
    this.filterObj.page = this.currentPage;
    this.valuesChanged$.next(this.filterObj);
  }
}
