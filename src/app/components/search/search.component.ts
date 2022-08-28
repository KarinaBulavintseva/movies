import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { DataStorageService } from '../../services/data-storage.service';
import { Movie } from 'src/app/interfaces/Movie';
import { SearchParams } from 'src/app/interfaces/Search';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  foundMovies: Movie[] = [];

  notFound = false;

  private subscription$ = new Subscription();

  constructor(
    private dataStorageService: DataStorageService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscription$.add(
      this.searchService.searchParamsChanged$.subscribe(
        (queryParams: SearchParams) => {
          this.subscribeOnRecievedData(queryParams);
        }
      )
    );
  }

  private subscribeOnRecievedData(queryParams: SearchParams) {
    this.subscription$.add(
      this.dataStorageService.getMoviesByQueryParams(queryParams).subscribe({
        next: (movies: Movie[]) => {
          if (!movies.length) {
            this.notFound = true;
          } else {
            this.notFound = false;
            this.foundMovies = movies;
          }
        },
        error: () => (this.notFound = true),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
