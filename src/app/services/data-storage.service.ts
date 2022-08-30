import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie, MovieDetails, ResponseData } from '../interfaces/Movie';
import { SearchParams } from '../interfaces/Search';
import { SelectedOption, SortOptions } from '../constants/FilterConstants';
import { DataManagingService } from './data-managing.service';
import { Filter } from '../interfaces/Filter';
import { PaginationOptions } from '../constants/PaginationConstants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private dataManagingService: DataManagingService
  ) {}

  getMovies(filterProperties?: Filter): Observable<Movie[]> {
    let url = '';
    if (!filterProperties) {
      url = environment.urlMovies;
    } else {
      let option = filterProperties.sortingOption || SelectedOption;
      let page = filterProperties.pageNumber || PaginationOptions.INITIAL_PAGE;
      let genres = filterProperties.genres || '';

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

  getMovieDetailsById(id: number): Observable<MovieDetails> {
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

  getMoviesByQueryParams(searchParams: SearchParams): Observable<Movie[]> {
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
