import { Injectable } from '@angular/core';
import { MoviesService } from './movies.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private moviesService: MoviesService) {}

  toNextPage() {
    if (this.moviesService.currentPage < this.moviesService.maxNumberOfPages) {
      this.moviesService.currentPage++;
      this.moviesService.emitValuesChanged();
    }
  }

  toPreviousPage() {
    if (this.moviesService.currentPage > this.moviesService.initialPageNumber) {
      this.moviesService.currentPage--;
      this.moviesService.emitValuesChanged();
    }
  }
}
