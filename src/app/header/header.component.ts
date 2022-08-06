import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  inputText = '';

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  onSearch() {
    this.searchService.searchMovies(this.inputText);
  }
}
