import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { SearchService } from '../services/search.service';
import { DataStorageService } from '../services/data-storage.service';
import { Filter } from '../interfaces/Filter';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  private subscription$ = new Subscription();
  isFilterPanelVisible = true;

  constructor(
    private dataStorageService: DataStorageService,
    private moviesService: MoviesService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscription$.add(this.subscribeOnRecievedData());

    this.subscription$.add(
      this.moviesService.filterValuesChanged$.subscribe((res) =>
        this.subscribeOnRecievedData(res)
      )
    );

    this.subscription$.add(
      this.searchService.isFilterPanelToggle$.subscribe(
        (res) => (this.isFilterPanelVisible = res)
      )
    );
  }

  subscribeOnRecievedData(propertiesObj?: Filter) {
    this.dataStorageService
      .fetchMovies(propertiesObj)
      .subscribe((mov) => (this.movies = mov));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
