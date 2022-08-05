import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
    this.emitChangesOfParams();
  }

  filterGenres(event: Event) {
    if ((<HTMLInputElement>event.target).checked) {
      this.idsOfPickedGenres.push((<HTMLInputElement>event.target).value);
    } else {
      this.idsOfPickedGenres = this.idsOfPickedGenres.filter(
        (item) => item !== (<HTMLInputElement>event.target).value
      );
    }
    this.emitChangesOfParams();
  }

  emitChangesOfParams() {
    this.moviesService.currentPage = this.moviesService.initialPageNumber;
    this.moviesService.filterObj.option = this.selectedValue;
    this.moviesService.filterObj.genre = this.idsOfPickedGenres;
    this.moviesService.onSend();
  }
}
