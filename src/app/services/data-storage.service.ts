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

      url = `${environment.urlMovies}&language=en-US&sort_by=${option}&page=${page}&with_genres=${genre}`;
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
        `${environment.urlMoviesDetails}${id}?api_key=${environment.apiKey}&language=en-US`
      )
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }

  getMovieByQueryParam(obj: { page: number; text: string }) {
    return this.http
      .get<ResponseData>(`${environment.urlSearch}${obj.text}&page=${obj.page}`)
      .pipe(
        map((responseData) => {
          this.paginationService.defineTotalMoviesNumber(
            responseData.total_results
          );
          return responseData.results;
        })
      );
  }
}
