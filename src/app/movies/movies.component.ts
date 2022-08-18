import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../interfaces/interfaces';
import { DataStorageService } from '../services/data-storage.service';
import { DataManagingService } from '../services/data-managing.service';
import { Filter } from '../interfaces/Filter';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  private subscription$ = new Subscription();

  constructor(
    private dataStorageService: DataStorageService,
    private dataManagingService: DataManagingService
  ) {}

  ngOnInit(): void {
    this.subscription$.add(this.subscribeOnRecievedData());
    this.subscription$.add(
      this.dataManagingService.filterParamsChanged$.subscribe(
        (changedValues: Filter) => {
          this.subscribeOnRecievedData(changedValues);
        }
      )
    );
    this.dataManagingService.clearOptions();
  }

  subscribeOnRecievedData(propertiesObj?: Filter) {
    this.dataStorageService
      .getMovies(propertiesObj)
      .subscribe((movies: Movie[]) => (this.movies = movies));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
