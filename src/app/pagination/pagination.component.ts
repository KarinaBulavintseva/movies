import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationOptions } from '../constants/PaginationConstants';
import { PaginationParams } from '../interfaces/interfaces';
import { DataManagingService } from '../services/data-managing.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  pageSize = PaginationOptions.PAGE_SIZE;
  maxSize = PaginationOptions.MAX_SIZE;
  collectionSize = this.dataManagingService.maxElementsNumber;
  numberOfPage = 1;
  subscription = new Subscription();

  constructor(
    private dataManagingService: DataManagingService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.dataManagingService.pageAndMoviesNumberChanged$.subscribe(
      (result: PaginationParams) => {
        this.collectionSize = result.moviesNumber;
        this.numberOfPage = result.pageNumber;
      }
    );
  }

  changePage() {
    this.dataManagingService.changePageNumber(this.numberOfPage);
    this.searchService.changePage(this.numberOfPage);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
