import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MovieDetails } from '../interfaces/interfaces';
import { DataStorageService } from '../services/data-storage.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UrlBuilderService } from '../services/url-builder.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id!: number;

  faHeart = faHeart;
  urlImage = '';
  isHeartClicked = false;

  movieDetailsObject: MovieDetails = {
    title: '',
    tagline: '',
    runtime: 0,
    release_date: '',
    budget: 0,
    revenue: 0,
    genres: [],
    poster_path: '',
    backdrop_path: '',
    overview: '',
    homepage: '',
    status: '',
    vote_average: 0,
  };

  private subscription = new Subscription();

  constructor(
    public activeModal: NgbActiveModal,
    private dataStorageService: DataStorageService,
    private localStorageService: LocalStorageService,
    private urlBuilderService: UrlBuilderService
  ) {}

  ngOnInit(): void {
    this.subscribeOnMovieData();
  }

  subscribeOnMovieData() {
    this.subscription.add(
      this.dataStorageService
        .getMovieDetailsById(this.id)
        .subscribe((movieData: MovieDetails) => {
          this.movieDetailsObject = movieData;
          this.urlImage = this.urlBuilderService.getPosterUrl(
            this.movieDetailsObject
          );
          this.checkIfMovieIsFavourite();
        })
    );
  }

  addToFavourite() {
    this.isHeartClicked = !this.isHeartClicked;
    this.localStorageService.removeOrAddMovie(
      this.isHeartClicked,
      this.movieDetailsObject
    );
  }

  checkIfMovieIsFavourite() {
    this.isHeartClicked = this.localStorageService.checkIfMovieIsInLocalStorage(
      this.movieDetailsObject
    );
  }

  onClose(){
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
