import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './services/local-storage.service';


@Injectable({
  providedIn: 'root',
})
export class FavouriteGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const moviesFromLocalStorage =
      this.localStorageService.checkIfUserIsAuthorithed();
    return !!moviesFromLocalStorage;
  }
}