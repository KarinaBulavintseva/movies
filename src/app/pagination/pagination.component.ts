import { Component, OnInit } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  constructor(public paginationService: PaginationService) {}

  ngOnInit(): void {}

  onNextPage() {
    this.paginationService.toNextPage();
  }

  onPreviousPage() {
    this.paginationService.toPreviousPage();
  }
}
