import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  isUserLogged: boolean;

  constructor(private authService: AuthenticationService) {
  }

  /**
   * Check if the user is currently logged onInit in order to adjust to header accordingly.
   */
  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.isUserLogged = true;
    }
    this.authService.isUserLogged.subscribe(
      (ans: boolean) => {
        this.isUserLogged = ans;
      }
    );
  }

  /**
   * call logout method od the authenticationService in order to logout the user from the application.
   */
  onLogout() {
    this.authService.logout();
  }
}
