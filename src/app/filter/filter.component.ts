import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  genres = this.filterService.genreList;
  options = this.filterService.optionsList;

  blockFilterPanel = true;

  constructor(
    private filterService: FilterService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchService.isFilterPanel$.subscribe(
      (res) => (this.blockFilterPanel = res)
    );
  }

  onChangeOption(event: Event) {
    this.filterService.selectNewOption(event);
  }

  onPickGenre(event: Event) {
    this.filterService.filterGenres(event);
  }
}
