import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UrlProperties } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  currentPage = 1;
  maxNumberOfPages = 100;
  initialPageNumber = 1;

  propertiesObject: UrlProperties = {};

  pageChanged = new Subject<UrlProperties>();

  constructor() {}

  toNextPage() {
    if (this.currentPage < this.maxNumberOfPages) {
      this.currentPage++;
      this.emitPageChanging();
    }
  }

  toPreviousPage() {
    if (this.currentPage > this.initialPageNumber) {
      this.currentPage--;
      this.emitPageChanging();
    }
  }

  emitPageChanging() {
    this.propertiesObject.pageNumber = this.currentPage;
    this.pageChanged.next(this.propertiesObject);
  }
}
