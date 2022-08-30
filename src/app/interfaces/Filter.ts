export interface Filter {
  sortingOption: string;
  genres: Array<number>;
  pageNumber: number;
}

export interface Genre {
  id: number;
  name: string;
  checked?: boolean;
}
export interface SortingOption {
  value: string;
  title: string;
}

export interface ActiveFilterParams {
  [key: string]: boolean;
}
