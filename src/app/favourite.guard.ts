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
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.localStorageService.checkIfUserAuthenticated();
  }
}
