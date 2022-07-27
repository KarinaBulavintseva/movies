import { Component, OnInit } from '@angular/core';
import {faCirclePlay} from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass,faBookmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faBookmark = faBookmark;
  faMagnifyingGlass = faMagnifyingGlass;
  faCirclePlay = faCirclePlay;
  constructor() { }

  ngOnInit(): void {
  }

}
