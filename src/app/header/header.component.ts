import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import {
  faMagnifyingGlass,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
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
  subscription = new Subscription();
  currentUrl = '';

  constructor(
    private router: Router,
    private searchService: SearchService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.getAuthedUsername();
    this.subscription.add(
      this.localStorageService.usernameChanged$.subscribe((username) => {
        this.authedUsername = username;
      })
    );
  }

  onSearch() {
    this.searchService.updateTextForSearch(this.inputText);
    this.router.navigate(['search']);
  }

  getAuthedUsername() {
    this.authedUsername = this.localStorageService.getUsername();
  }

  onLogOut() {
    this.localStorageService.logOut();
    if(this.router.url ==='/favourite') this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
