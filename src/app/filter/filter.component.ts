import { Component, OnInit } from '@angular/core';
import { Genres, SortOptions } from '../constants/FilterConstants';
import { DataManagingService } from '../services/data-managing.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  genres = Genres;
  options = SortOptions;
  checkedGenreObj = this.filterService.filterObj;
  defaultOption = this.dataManagingService.option;

  constructor(
    private filterService: FilterService,
    private dataManagingService: DataManagingService
  ) {}

  ngOnInit(): void {
    console.log(this.checkedGenreObj);
  }

  onChangeOption(event: Event) {
    this.filterService.selectNewOption(event);
  }

  onPickGenre(checkedValue: number) {
    this.filterService.filterGenres(checkedValue);
  }
}
