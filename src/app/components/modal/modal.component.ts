import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MovieDetails } from 'src/app/interfaces/Movie';
import { DataStorageService } from '../../services/data-storage.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UrlBuilderService } from '../../services/url-builder.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id!: number;

  faHeart = faHeart;
  urlImage = '';
  isMovieFavourite = false;
  isAuthorithed = false;

  movieDetailsObject!: MovieDetails;

  private subscription$ = new Subscription();

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
    this.subscription$.add(
      this.dataStorageService
        .getMovieDetailsById(this.id)
        .subscribe((movieData: MovieDetails) => {
          this.movieDetailsObject = movieData;
          this.urlImage = this.urlBuilderService.getPosterUrl(
            this.movieDetailsObject
          );
          this.checkIfMovieIsFavourite();
          this.checkIfAuthenticated();
        })
    );
  }

  addToFavourite() {
    this.isMovieFavourite = !this.isMovieFavourite;
    this.localStorageService.removeOrAddMovie(
      this.isMovieFavourite,
      this.movieDetailsObject
    );
  }

  onClose() {
    this.activeModal.close();
  }

  private checkIfAuthenticated() {
    this.isAuthorithed = this.localStorageService.checkIfUserAuthenticated();
  }

  private checkIfMovieIsFavourite() {
    this.isMovieFavourite =
      this.localStorageService.checkIfMovieIsInLocalStorage(
        this.movieDetailsObject
      );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
