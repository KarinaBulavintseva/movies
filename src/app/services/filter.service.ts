import { Injectable } from '@angular/core';
import {
  Genres,
  selectedOption,
  SortOptions,
} from '../constants/FilterConstants';
import { MoviesService } from './movies.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  genreList = Genres;
  optionsList = SortOptions;
  selectedValue = selectedOption;
  idsOfPickedGenres: string[] = [];

  constructor(private moviesService: MoviesService) {}

  selectNewOption(event: Event) {
    this.selectedValue = (<HTMLSelectElement>event.target).value;
    this.notifyChangesOfParams();
  }

  filterGenres(checkedValue: string) {
    let isValueExist = this.idsOfPickedGenres.includes(checkedValue);

    if (isValueExist) {
      this.idsOfPickedGenres = this.idsOfPickedGenres.filter(
        (item) => item !== checkedValue
      );
    } else {
      this.idsOfPickedGenres.push(checkedValue);
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
