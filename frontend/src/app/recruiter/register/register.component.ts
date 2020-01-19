import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthenticationService } from "../../shared/authentication.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent { 
  
  constructor(private auth: AuthenticationService,
              private _router: Router,
              private _snackBar: MatSnackBar) { }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if(form.status == "VALID"){
      this.auth.register(email, password, 'anon', 'anon', '0', this.auth.getAuthenticatedUser().getUsername()).subscribe(
        (res) => {        
          console.log(res);
          form.reset();
          this.openSnackBar('Recruiter registered!', 'OK');
        },
        (err) => {
          console.log(err);
          this.openSnackBar(err.message, 'OK');
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}