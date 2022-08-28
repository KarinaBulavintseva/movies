import { Injectable } from '@angular/core';
import { DataManagingService } from './data-managing.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterObj: any = {};

  constructor(private dataManagingService: DataManagingService) {}

  selectNewOption(event: Event) {
    this.dataManagingService.option = (<HTMLSelectElement>event.target).value;
    this.dataManagingService.updateFilterParams();
  }

  filterGenres(checkedValue: number) {
    let isValueExist =
      this.dataManagingService.genresList.includes(checkedValue);

    if (isValueExist) {
      this.dataManagingService.genresList =
        this.dataManagingService.genresList.filter(
          (item) => item !== checkedValue
        );
      this.filterObj[checkedValue] = false;
    } else {
      this.dataManagingService.genresList.push(checkedValue);
      this.filterObj[checkedValue] = true;
    }
    this.dataManagingService.updateFilterParams();
  }
}
