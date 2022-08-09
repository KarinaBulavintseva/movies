import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  faXMark = faXmark;
  @Input() movie: any = [];
  urlImage = '';
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log(this.movie);
    this.urlImage = environment.urlImage + this.movie.poster_path;
    if (!this.movie.backdrop_path || this.movie.backdrop_path === null) {
      this.urlImage = 'assets/images/no_image.jpg';
    }
  }
}
