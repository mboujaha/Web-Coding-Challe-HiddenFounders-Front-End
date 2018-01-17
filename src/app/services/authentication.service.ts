import {LoginInfo} from '../models/loginInfo.model';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {CookieService} from 'ngx-cookie-service';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  baseAuthUrl = 'http://localhost:8080/auth';
  isUserLogged = new Subject<boolean>(); // to send a new value at each user logout.

  /**
   * Inject the CookieService, HttpClient and the angular Router.
   * @param {HttpClient} http
   * @param {CookieService} cookies
   * @param {Router} router
   */
  constructor(private http: HttpClient,
              private cookies: CookieService,
              private router: Router) {
  }

  /**
   * Send a post request with the required parameters to authenticate the user.
   * @param {LoginInfo} userInfo
   * @returns {Observable<any>}
   */
  login(userInfo: LoginInfo): Observable<any> {
    return this.http.post(this.baseAuthUrl + '/login', userInfo);
  }

  /**
   * Send a post request with the required parameters to register a new user.
   * @param {User} user
   * @returns {Observable<any>}
   */
  register(user: User): Observable<any> {
    return this.http.post(this.baseAuthUrl + '/register', user);
  }

  /**
   * Set the currently logged user using the cookie service and send a new value  for the isUserLogged Subject.
   * @param {{}} user
   */
  setLoggedUser(user: {}) {
    this.cookies.set('userEmail', user['email']);
    this.cookies.set('userID', user['id']);
    this.isUserLogged.next(true);
  }

  /**
   * return the email of the currently logged user.
   * @returns {string}
   */
  getLoggedUser(): string {
    return this.cookies.get('userEmail');
  }

  /**
   * return true if there is logged in user.
   * @returns {boolean}
   */
  isUserLoggedIn(): boolean {
    return this.cookies.check('userEmail');
  }

  /**
   * removes the user's information from the cookies and therefor the user is logged out and send a new value  for the isUserLogged Subject.
   * redirect to user to the home page.
   */
  logout() {
    this.cookies.delete('userEmail');
    this.cookies.delete('userID');
    this.isUserLogged.next(false);
    this.router.navigate(['/']);
  }

  /**
   * return the id of the logged in user.
   * @returns {string}
   */
  getLoggedID(): string {
    return this.cookies.get('userID');
  }


}
