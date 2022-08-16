import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FavouriteService } from './services/favourite.service';

@Injectable({
  providedIn: 'root',
})
export class FavouriteGuard implements CanActivate {
  constructor(private favouriteService: FavouriteService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const moviesFromLocalStorage =
      this.favouriteService.getMoviesFromLocalStorage();
    if (moviesFromLocalStorage.length) {
      return true;
    }
    return false;
  }
}
