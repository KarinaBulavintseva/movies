// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlMovies:
    'https://api.themoviedb.org/3/discover/movie?api_key=a3f404e23cd6eeaf1c56dada4eac5aa2&language=en-US&',
  urlSearch:
    'https://api.themoviedb.org/3/search/movie?api_key=a3f404e23cd6eeaf1c56dada4eac5aa2&language=en-US&query=',
  urlImage: 'https://image.tmdb.org/t/p/w500',
  urlMoviesDetails:'https://api.themoviedb.org/3/movie/',
  apiKey:`a3f404e23cd6eeaf1c56dada4eac5aa2`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
