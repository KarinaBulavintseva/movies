import { Component, Input, OnInit } from '@angular/core';
import { Movie, MovieDetails } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie | MovieDetails;

  urlImage = '';

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    let definedUrl = this.movie.poster_path || this.movie.backdrop_path;
    definedUrl
      ? (this.urlImage = environment.urlImage + definedUrl)
      : (this.urlImage = 'assets/images/no_image.jpg');
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.id = this.movie.id;
  }
}
