import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string; // Specify which  error message to show the user in case the login fails.

  /**
   * inject the AuthenticationService and the angular Router.
   * @param {AuthenticationService} authService
   * @param {Router} router
   */
  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  /**
   * Retrieve the register parameters from the form and send a register request to the server.
   * @param {NgForm} form
   */
  onRegister(form: NgForm) {
    const values = form.value; // the form values which the user has entered.

    const user = new User(); // Instantiate a new user.

    user.first_name = values.fname; // Retrieve the first name which the user entered.
    user.last_name = values.lname; // Retrieve the last name which the user entered.
    user.email = values.email; // Retrieve the email which the user entered.
    user.password = values.password; // Retrieve the password which the user entered.

    /**
     * Call the register method of the AuthenticationService and passing it the parameters necessary for the registration.
     * if the registration is successful then set the current logged user and redirect to the home page.
     * else show the error message which the server sent back and clear the form.
     */
    this.authService.register(user).subscribe(
      (response) => {
        this.authService.setLoggedUser(response);
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error.error;
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
