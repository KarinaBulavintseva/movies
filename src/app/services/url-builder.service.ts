import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie, MovieDetails } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UrlBuilderService {
  constructor() {}

  getPosterUrl(movie: Movie | MovieDetails) {
    let definedUrl = movie.poster_path || movie.backdrop_path;
    return definedUrl
      ? environment.urlImage + definedUrl
      : 'assets/images/no_image.jpg';
  }
}
