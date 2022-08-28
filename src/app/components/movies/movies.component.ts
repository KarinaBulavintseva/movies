import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { DataStorageService } from '../../services/data-storage.service';
import { DataManagingService } from '../../services/data-managing.service';
import { Filter } from '../../interfaces/Filter';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];

  notFound = false;

  private subscription$ = new Subscription();

  constructor(
    private dataStorageService: DataStorageService,
    private dataManagingService: DataManagingService
  ) {}

  ngOnInit(): void {
    this.subscription$.add(
      this.dataManagingService.filterParamsChanged$.subscribe(
        (changedValues: Filter) => {
          this.subscribeOnRecievedData(changedValues);
        }
      )
    );
  }

  private subscribeOnRecievedData(filterProperties?: Filter) {
    this.dataStorageService
      .getMovies(filterProperties)
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
        movies.length ? (this.notFound = false) : (this.notFound = true);
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
