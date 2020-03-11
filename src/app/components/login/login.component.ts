import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['dashboard']);
    }
  }

  logIn() {
    const passwordControl = this.form.get('password');
    const emailControl = this.form.get('email');
      this.authenticationService.signIn(emailControl.value, passwordControl.value)
        .catch(
          () => {
            passwordControl.setErrors({incorrect: true});
            emailControl.setErrors({incorrect: true})
          }
        )
      ;
  }

  getEmailErrorMessage() {
    return this.form.get('email').hasError('required') ? 'Veuillez entrer votre adresse e-mail' :
      this.form.get('email').hasError('email') ? 'Cette adresse e-mail est invalide' :
        '';
  }

  getPasswordErrorMessage() {
    return this.form.get('password').hasError('required') ? 'Veuillez entrer votre mot de passe' :
      this.form.get('password').hasError('incorrect') ? 'L\'e-mail ou le mot de passe est incorrect' :
        '';
  }
}
