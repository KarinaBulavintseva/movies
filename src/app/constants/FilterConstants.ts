import { Genre, SortingOption } from '../interfaces/Filter';

export const SortOptions: SortingOption[] = [
  { value: 'popularity.desc', title: 'Popularity(descending)' },
  { value: 'popularity.asc', title: 'Popularity(ascending)' },
  { value: 'vote_count.desc', title: 'Vote count(descending)' },
  { value: 'vote_count.asc', title: 'Vote count(ascending)' },
  { value: 'revenue.desc', title: 'Revenue(descending)' },
  { value: 'revenue.asc', title: 'Revenue(ascending)' },
  { value: 'vote_average.desc', title: 'Rating(descending)' },
  { value: 'vote_average.asc', title: 'Rating(ascending)' },
  { value: 'release_date.desc', title: 'Release(descending)' },
  { value: 'release_date.asc', title: 'Release(ascending)' },
];

export const SelectedOption: string = 'popularity.desc';

export const Genres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];
