import { Component, Input, OnInit } from '@angular/core';
import { Movie, MovieDetails } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UrlBuilderService } from 'src/app/services/url-builder.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie | MovieDetails;

  urlImage = '';

  constructor(
    private modalService: NgbModal,
    private urlBuilderService: UrlBuilderService
  ) {}

  ngOnInit() {
    this.urlImage = this.urlBuilderService.getPosterUrl(this.movie);
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.id = this.movie.id;
  }
}
