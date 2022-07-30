import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { responseData } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchMovies(): Observable<Movie[]> {
    return this.http
      .get<responseData>(
        `${environment.urlMovies}popular?api_key=${environment.apiKey}&language=en-US&page=1`
      )
      .pipe(
        map((responseData) => {
          return responseData.results;
        })
      );
  }
}
