import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { SearchService } from '../services/search.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  private subscription!: Subscription;
  blockFilterPanel = false;

  constructor(
    private dataStorageService: DataStorageService,
    private moviesService: MoviesService,
    private searchService:SearchService
  ) {}

  ngOnInit(): void {
    this.dataStorageService
      .fetchMovies()
      .subscribe((res) => (this.movies = res));
    this.moviesService.valuesChanged$.subscribe((res) =>
      this.dataStorageService
        .fetchMovies(res)
        .subscribe((mov) => (this.movies = mov))
    );
    this.searchService.isFilterPanel$.subscribe(
      (res) => (this.blockFilterPanel = !res)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
