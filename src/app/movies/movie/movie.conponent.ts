import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie;

  urlImage = ''

  ngOnInit(){
    this.urlImage = environment.urlImage + this.movie.poster_path;
  }

}
