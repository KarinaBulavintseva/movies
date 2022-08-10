import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  numberOfPage = 1;
  maxPageNumber = 500;

  constructor(
    private paginationService: PaginationService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.moviesService.valuesChanged$.subscribe((res) => {
      this.numberOfPage = res.page;
      this.maxPageNumber = res.maxNumberOfPages;
    });
  }

  onNextPage() {
    this.paginationService.toNextPage();
  }

  onPreviousPage() {
    this.paginationService.toPreviousPage();
  }
}
