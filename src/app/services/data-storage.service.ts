import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  MovieDetails,
  ResponseData,
  SearchParams,
} from '../interfaces/interfaces';
import { SortOptions } from '../constants/FilterConstants';
import { DataManagingService } from './data-managing.service';
import { Filter } from '../interfaces/Filter';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private dataManagingService: DataManagingService
  ) {}

  getMovies(objOfProperties?: Filter) {
    let url = '';
    if (!objOfProperties) {
      url = environment.urlMovies;
    } else {
      let option = objOfProperties.sortingOption || SortOptions[0].value;
      let page = objOfProperties.pageNumber || 1;
      let genres = objOfProperties.genres || '';

      url = `${environment.urlMovies}&language=en-US&sort_by=${option}&page=${page}&with_genres=${genres}`;
    }

    return this.http.get<ResponseData>(url).pipe(
      map((responseData) => {
        this.dataManagingService.defineTotalMoviesNumber(
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

  getMoviesByQueryParams(searchParams: SearchParams) {
    return this.http
      .get<ResponseData>(
        `${environment.urlSearch}${searchParams.text}&page=${searchParams.pageNumber}`
      )
      .pipe(
        map((responseData) => {
          this.dataManagingService.defineTotalMoviesNumber(
            responseData.total_results
          );
          return responseData.results;
        })
      );
  }
}
