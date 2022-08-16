import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { DataStorageService } from '../services/data-storage.service';
import { Movie } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  foundMovies: Movie[] = [];
  subscription = new Subscription();

  constructor(
    private dataStorageService: DataStorageService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.searchService.queryChanged$.subscribe((queryParams) => {
        this.dataStorageService
          .getMovieByQueryParam(queryParams)
          .subscribe((movies) => {
            this.foundMovies = movies;
          });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
