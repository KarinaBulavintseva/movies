import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Movie, UrlProperties } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { ResponseData } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchMovies(objOfProperties: UrlProperties): Observable<Movie[]> {
    const currentPage = objOfProperties.pageNumber ?? 1;

    let url = `${environment.urlMovies}popular?api_key=${environment.apiKey}&language=en-US&page=${currentPage}`;

    return this.http.get<ResponseData>(url).pipe(
      map((responseData) => {
        return responseData.results;
      })
    );
  }
}
