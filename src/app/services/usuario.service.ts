import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone) {
  
    this.googleInit();
  }

  googleInit() {

    return new Promise<void>( resolve => {
      console.log('google init');
      
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '386541972897-e00nims3vuqbnsru7vs0k0a3ti01ufm2.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          // scope: 'additional_scope'
        });
        resolve();
      });
    })

  }

  logout(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => of(false) )
    );
  }

    crearUsuario( formData: RegisterForm ) {
      console.log(' creando usuario ');

      // El siguiente return dispara un observable del backend, suscribiensode en register.component.
      return this.http.post(`${ base_url }/usuarios`, formData)
                 .pipe(
                   tap( (resp: any) => {
                     localStorage.setItem('token', resp.token)
                   })
                 );

    }

    login( formData: LoginForm ) {

      return this.http.post(`${ base_url }/login`, formData)
                 .pipe(
                   tap( (resp: any) => {
                     // console.log(resp);
                     localStorage.setItem('token', resp.token)
                   })
                 );

    }

    loginGoogle( token: any ) {

      return this.http.post(`${ base_url }/login/google`, { token })
                 .pipe(
                   tap( (resp: any) => {
                     // console.log(resp);
                     localStorage.setItem('token', resp.token)
                   })
                 );

    }
}
