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

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {}

  onChangeOption(event: Event) {
    this.filterService.selectNewOption(event);
  }

  onPickGenre(event: any) {
    let checkedValue = event.target.value;
    this.filterService.filterGenres(checkedValue);
  }
}
