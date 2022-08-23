import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import {
  faMagnifyingGlass,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  faUserCircle = faUserCircle;
  inputText = '';
  AuthenticatedUser = '';

  constructor(
    private router: Router,
    private searchService: SearchService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.checkAuthorithedUser();
    this.localStorageService.userName.subscribe((res) => {
      this.AuthenticatedUser = res;
    });
  }

  onSearch() {
    this.searchService.updateTextForSearch(this.inputText);
    this.router.navigate(['search']);
  }

  checkAuthorithedUser() {
    this.AuthenticatedUser =
      this.localStorageService.checkIfUserIsAuthorithed();
  }

  onLogOut() {
    this.localStorageService.logOut();
    this.router.navigate(['/']);
  }
}
