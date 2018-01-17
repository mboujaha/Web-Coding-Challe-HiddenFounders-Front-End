import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Shop} from '../models/shop.model';
import {AuthGuardService} from './authGuard.service';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class ShopService {
  baseUrl = 'http://localhost:8080/api';

  /**
   * Inject the authService and HttpClient.
   * @param {HttpClient} http
   * @param {AuthenticationService} authService
   */
  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  /**
   * Send a get request to the server to retrieve all the available shops.
   * @returns {Observable<any>}
   */
  getAllShops(): Observable<any> {
    return this.http.get(this.baseUrl + '/shops');
  }

  /**
   * Adds a shop to the preferred list of the currently logged user.
   * @param {Shop} shop
   * @returns {Observable<any>}
   */
  addToPreferredList(shop: Shop): Observable<any> {
    if (this.authService.isUserLoggedIn()) {
      return this.http.post(this.baseUrl + '/shops/' + shop._id, this.authService.getLoggedID());
    }
  }

  /**
   * Return the preferred list of the currently logged user.
   * @returns {Observable<any>}
   */
  getPreferredList(): Observable<any> {
    if (this.authService.isUserLoggedIn()) {
      return this.http.get(this.baseUrl + '/shops/user/' + this.authService.getLoggedID());
    }
  }

  /**
   * Remove a shop to the preferred list of the currently logged user.
   * @param {Shop} shop
   * @returns {Observable<any>}
   */
  removeShopFromPreferredList(shop: Shop): Observable<any> {
    return this.http.delete(this.baseUrl + '/shop/' + shop._id + '/user/' + this.authService.getLoggedID());
  }
}
