import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  inputText = '';

  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {}

  onSearch() {
    this.searchService.updateTextForSearch(this.inputText);
    this.router.navigate(['search']);
  }
}
