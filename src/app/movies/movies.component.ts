import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/interfaces';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private storageService: DataStorageService) {}

  ngOnInit(): void {
    this.storageService.fetchMovies().subscribe((movies) => {
      this.movies = movies;
      console.log(this.movies);
    });
  }
}
