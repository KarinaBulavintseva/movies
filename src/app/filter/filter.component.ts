import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  genres = this.filterService.genreList;
  options = this.filterService.optionsList;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.clearGenres();
  }

  onChangeOption(event: Event) {
    this.filterService.selectNewOption(event);
  }

  onPickGenre(checkedValue: string) {
    this.filterService.filterGenres(checkedValue);
  }
}
