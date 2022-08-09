import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie;

  urlImage = '';

  constructor(private ngvModal: NgbModal) {}

  ngOnInit() {
    this.urlImage = environment.urlImage + this.movie.poster_path;
    if (!this.movie.backdrop_path || this.movie.backdrop_path === null) {
      this.urlImage = 'assets/images/no_image.jpg';
    }
  }

  openModal(movie: any) {
    const modalRef = this.ngvModal.open(ModalComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.movie = movie;
  }
}
