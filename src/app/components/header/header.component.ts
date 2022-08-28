import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import {
  faMagnifyingGlass,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  faMagnifyingGlass = faMagnifyingGlass;
  faUserCircle = faUserCircle;
  inputText = '';
  authedUsername = '';
  currentUrl = '';

  private subscription$ = new Subscription();

  constructor(
    private router: Router,
    private searchService: SearchService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.getAuthedUsername();
    this.subscription$.add(
      this.localStorageService.usernameChanged$.subscribe((username) => {
        this.authedUsername = username;
      })
    );
  }

  onSearch() {
    if (!this.inputText.length) return;
    this.searchService.updateTextForSearch(this.inputText);
    this.router.navigate(['search']);
  }

  onLogOut() {
    this.localStorageService.logOut();
    if (this.router.url === '/favourite') this.router.navigate(['/']);
  }

  private getAuthedUsername() {
    this.authedUsername = this.localStorageService.getUsername();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
