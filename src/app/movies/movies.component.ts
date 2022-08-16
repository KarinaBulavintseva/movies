import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { DataStorageService } from '../services/data-storage.service';
import { Filter } from '../interfaces/Filter';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  private subscription = new Subscription();

  constructor(
    private dataStorageService: DataStorageService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.subscribeOnRecievedData());

    this.subscription.add(
      this.moviesService.filterValuesChanged$.subscribe((changedValues) =>
        this.subscribeOnRecievedData(changedValues)
      )
    );
  }

  subscribeOnRecievedData(propertiesObj?: Filter) {
    this.dataStorageService
      .fetchMovies(propertiesObj)
      .subscribe((movies) => (this.movies = movies));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
