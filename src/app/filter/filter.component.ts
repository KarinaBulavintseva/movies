import { Component, OnInit } from '@angular/core';
import { Genres, SortOptions } from '../constants/FilterConstants';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  genres = Genres;
  options = SortOptions;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {}

  onChangeOption(event: Event) {
    this.filterService.selectNewOption(event);
  }

  onPickGenre(checkedValue: string) {
    this.filterService.filterGenres(checkedValue);
  }
}
