import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    remember: [false]
  });

  constructor(private router: Router, 
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    // console.log('SUBMIT');
    // console.log( this.loginForm.value)
    this.usuarioService.login( this.loginForm.value )
        .subscribe( resp => {
          // console.log(resp);
          if ( this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);            
          }else{
            localStorage.removeItem('email');
          }
            // Navegar al dashboard
            this.router.navigateByUrl('/');
        },(err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

/*
  // Las siguientes 3 funciones son traidas de : https://developers.google.com/identity/sign-in/web/build-button .
  // Es necesario agregar "any" en las siguientes dos funciones.
  onSuccess(googleUser: any) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log( id_token );
  }

  onFailure(error: any) {
    console.log(error);
  }
*/

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // 'onsuccess': this.onSuccess,
      // 'onfailure': this.onFailure
    });
    this.startApp();
  }

  // Es necesario agregar "any" en las siguientes dos funciones.
  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin( document.getElementById('my-signin2') );
  };

  attachSignin(element: any) {

    // console.log(element.id);
    this.auth2.attachClickHandler( element, {},
        (googleUser: any) => {

          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.usuarioService.loginGoogle( id_token )
              .subscribe(resp => {
                // Navegar al dashboard
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })
              });

          
        }, (error: any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


}
