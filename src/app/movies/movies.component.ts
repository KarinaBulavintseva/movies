import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie, UrlProperties } from '../interfaces/interfaces';
import { PaginationService } from '../pagination/pagination.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  private subscription!: Subscription;

  constructor(
    private storageService: DataStorageService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getMovies({});
    this.subscription = this.paginationService.pageChanged.subscribe((res) =>
      this.getMovies(res)
    );
  }

  getMovies(urlProperties: UrlProperties) {
    this.storageService
      .fetchMovies(urlProperties)
      .subscribe((mov) => (this.movies = mov));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
