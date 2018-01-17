import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginInfo} from '../../models/loginInfo.model';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string; // Specify which  error message to show the user in case the login fails.

  /**
   * inject the AuthenticationService and the angular Router.
   * @param {AuthenticationService} authService
   * @param {Router} router
   */
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  /**
   * Retrieve the login parameters from the form and send a login request to the server.
   * @param {NgForm} form
   */
  onLogin(form: NgForm) {
    const values = form.value; // the form values which the user has entered.

    const userInfo = new LoginInfo(); // instantiate a new loginInfo which contains the necessary fields in order to login.

    userInfo.email = values.email;  // Retrieve the email which the user entered.
    userInfo.password = values.password;  // Retrieve the password which the user entered.

    /**
     * Call the login method of the AuthenticationService and passing it the parameters necessary for the login.
     * if the login is successful then set the current logged user and redirect to the home page.
     * else show the error message which the server sent back and clear the form.
     */
    this.authService.login(userInfo).subscribe(
      (response) => {
        this.authService.setLoggedUser(response);
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error.error;
        this.clearForm(form);
      }
    );
  }

  /**
   * Reset the field of the form;
   * @param {NgForm} form
   */
  clearForm(form: NgForm) {
    form.reset();
  }
}
