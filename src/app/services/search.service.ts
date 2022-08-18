import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchParams } from '../interfaces/interfaces';
import { DataManagingService } from './data-managing.service';

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

  constructor(private dataManagingService: DataManagingService) {}

  updateTextForSearch(text: string) {
    this.text = text;
    this.currentPage = 1;
    this.emitSearchParamsChanging();
    this.dataManagingService.clearOptions();
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
