import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  inputText = '';

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }
  onSearch() {
    this.searchService.searchMovies(this.inputText);
  }

}
