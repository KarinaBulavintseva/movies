import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationOptions } from '../constants/PaginationConstants';
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
  currentUrl = '';

  constructor(
    private dataManagingService: DataManagingService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.x();
    this.dataManagingService.pageChanged$.subscribe((result: number) => {
      this.numberOfPage = result;
    });
    this.dataManagingService.moviesNumberChanged$.subscribe(
      (result: number) => {
        this.collectionSize = result;
      }
    );
  }

  changePage() {
    if (this.currentUrl === '/') {
      this.dataManagingService.changePageNumber(this.numberOfPage);
    } else {
      this.searchService.changePage(this.numberOfPage);
    }
  }

  x() {
    if (this.currentUrl === '/') {
      this.numberOfPage = this.dataManagingService.currentPage;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
