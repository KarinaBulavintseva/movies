import { Injectable } from '@angular/core';
import { DataManagingService } from './data-managing.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private dataManagingService: DataManagingService) {}

  selectNewOption(event: Event) {
    this.dataManagingService.option = (<HTMLSelectElement>event.target).value;
    this.dataManagingService.updateFilterParams();
  }

  filterGenres(checkedValue: string) {
    let isValueExist =
      this.dataManagingService.genresList.includes(checkedValue);

    if (isValueExist) {
      this.dataManagingService.genresList =
        this.dataManagingService.genresList.filter(
          (item) => item !== checkedValue
        );
    } else {
      this.dataManagingService.genresList.push(checkedValue);
    }
    this.dataManagingService.updateFilterParams();
  }
}
