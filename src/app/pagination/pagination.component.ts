import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  numberOfPage: number = 1;

  constructor(
    private paginationService: PaginationService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.moviesService.valuesChanged$.subscribe((res) => {
      if (res.page) {
        this.numberOfPage = res.page;
      }
    });
  }

  onNextPage() {
    this.paginationService.toNextPage();
  }

  onPreviousPage() {
    this.paginationService.toPreviousPage();
  }
}
