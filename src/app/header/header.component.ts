import { Component, OnInit } from '@angular/core';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faBookmark = faBookmark;

  inputText = '';

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  onSearch() {
    this.searchService.searchMovies(this.inputText);
  }
}
