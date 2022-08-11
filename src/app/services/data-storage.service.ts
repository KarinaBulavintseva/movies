import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovieDetails, ResponseData } from '../interfaces/interfaces';
import { SortOptions } from '../constants/FilterConstants';
import { Filter } from '../interfaces/Filter';
import { PaginationService } from './pagination.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) {}

  fetchMovies(objOfProperties?: Filter) {
    let url = '';

    if (!objOfProperties) {
      url = environment.urlMovies;
    } else {
      let option = objOfProperties.option || SortOptions[0].value;
      let page = objOfProperties.page || 1;
      let genre = objOfProperties.genre || '';
      let search = objOfProperties.searchText || '';

      if (search !== '') {
        url = `${environment.urlSearch}${search}&page=${page}`;
      } else {
        url = `${environment.urlMovies}&language=en-US&sort_by=${option}&page=${page}&with_genres=${genre}`;
      }
    }

    return this.http.get<ResponseData>(url).pipe(
      map((responseData) => {
        this.paginationService.defineTotalMoviesNumber(
          responseData.total_results
        );
        return responseData.results;
      })
    );
  }

  getMovieDetailsById(id: number) {
    return this.http
      .get<MovieDetails>(
        `${environment.urlMoviesDetails}${id}?api_key=a3f404e23cd6eeaf1c56dada4eac5aa2&language=en-US`
      )
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }
}
