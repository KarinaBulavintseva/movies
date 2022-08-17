import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { PaginationService } from '../services/pagination.service';
import { PaginationOptions } from '../constants/PaginationOptions';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  collectionSize = this.paginationService.currentNumberOfMovies;
  pageSize = PaginationOptions.PAGE_SIZE;
  maxSize = PaginationOptions.MAX_SIZE;
  numberOfPage = 1;
  subscription = new Subscription();

  constructor(
    private paginationService: PaginationService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.moviesService.pageAndItemsNumberChanged$.subscribe((changedData) => {
        this.collectionSize = changedData.elementsNumber;
        this.numberOfPage = changedData.pageNumber;
      })
    );
    this.changePage();
  }

  changePage() {
    this.paginationService.changePageNumber(this.numberOfPage);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
