import { Component } from '@angular/core';
import { Genres, SortOptions } from '../../constants/FilterConstants';
import { DataManagingService } from '../../services/data-managing.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  genres = Genres;
  options = SortOptions;
  checkedGenreObj = this.dataManagingService.activeFilterParams;
  defaultOption = this.dataManagingService.option;

  constructor(private dataManagingService: DataManagingService) {}

  onChangeOption(event: Event) {
    this.dataManagingService.selectNewOption(event);
  }

  onPickGenre(checkedValue: number) {
    this.dataManagingService.filterGenres(checkedValue);
  }
}
