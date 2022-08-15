import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieDetails } from '../interfaces/interfaces';
import { DataStorageService } from '../services/data-storage.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  faHeart = faHeart;
  @Input() id!: number;
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

  private subscription$ = new Subscription();

  constructor(
    public activeModal: NgbActiveModal,
    private dataStorageService: DataStorageService,
    private favouriteService: FavouriteService
  ) {}

  ngOnInit(): void {
    this.subscribeOnMovieData();
  }

  subscribeOnMovieData() {
    this.subscription$.add(
      this.dataStorageService
        .getMovieDetailsById(this.id)
        .subscribe((response) => {
          this.movieDetailsObject = response;
          this.defineImageUrlPath(this.movieDetailsObject);
          this.checkIfMovieIsFavourite();
        })
    );
  }

  defineImageUrlPath(movieObject: MovieDetails) {
    let definedUrl = movieObject.poster_path || movieObject.backdrop_path;
    if (definedUrl) {
      this.urlImage = environment.urlImage + definedUrl;
    } else {
      this.urlImage = 'assets/images/no_image.jpg';
    }
  }

  onIconClick() {
    this.isHeartClicked = !this.isHeartClicked;
    this.favouriteService.removeOrAddMovie(
      this.isHeartClicked,
      this.movieDetailsObject
    );
  }

  checkIfMovieIsFavourite() {
    this.isHeartClicked = this.favouriteService.checkIfMovieIsInLocalStorage(
      this.movieDetailsObject
    ); 
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
