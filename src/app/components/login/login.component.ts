import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  hide = true;

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
  }

  logIn() {
    this.authenticationService.signIn(this.form.get('email').value, this.form.get('password').value);
  }

  getEmailErrorMessage() {
    return this.form.get('email').hasError('required') ? 'Veuillez entrer votre adresse e-mail' :
      this.form.get('email').hasError('email') ? 'Cette adresse e-mail est invalide' :
        '';
  }

  getPasswordErrorMessage() {
    return this.form.get('password').hasError('required') ? 'Veuillez entrer votre mot de passe' : '';
  }
}
