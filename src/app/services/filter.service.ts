import { Injectable } from '@angular/core';
import { Genres, SortOptions } from '../constants/FilterConstants';
import { MoviesService } from './movies.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  genreList = Genres;
  optionsList = SortOptions;

  selectedValue = SortOptions[0].value;
  idsOfPickedGenres: string[] = [];

  constructor(private moviesService: MoviesService) {}

  selectNewOption(event: Event) {
    this.selectedValue = (<HTMLSelectElement>event.target).value;
    this.notifyChangesOfParams();
  }

  filterGenres(event: Event) {
    if ((<HTMLInputElement>event.target).checked) {
      this.idsOfPickedGenres.push((<HTMLInputElement>event.target).value);
    } else {
      this.idsOfPickedGenres = this.idsOfPickedGenres.filter(
        (item) => item !== (<HTMLInputElement>event.target).value
      );
    }
    this.notifyChangesOfParams();
  }

  notifyChangesOfParams() {
    this.moviesService.recieveChangesOfParams(
      this.selectedValue,
      this.idsOfPickedGenres
    );
  }
}
