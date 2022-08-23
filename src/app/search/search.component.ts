import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { DataStorageService } from '../services/data-storage.service';
import { Movie, SearchParams } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  foundMovies: Movie[] = [];
  subscription$ = new Subscription();

  constructor(
    private dataStorageService: DataStorageService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscription$.add(
      this.searchService.searchParamsChanged$.subscribe((queryParams: SearchParams) => {
        this.subscription$.add(
          this.dataStorageService
            .getMoviesByQueryParams(queryParams)
            .subscribe((movies: Movie[]) => {
              this.foundMovies = movies;
            })
        );
      })
    );
  }


  
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
