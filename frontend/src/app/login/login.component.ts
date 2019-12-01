import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailVerificationMessage = false;

  constructor(private auth: AuthenticationService,
              private _router: Router) {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.signIn(email, password).subscribe(() => {
      this._router.navigateByUrl('/users');
    }, (err) => {
      console.log(err);
      this.emailVerificationMessage = true;
    });
    this.auth.getAuthenticatedUser().getUserAttributes((errors, attrs) => {
      console.log(attrs);
    });
  }
}
