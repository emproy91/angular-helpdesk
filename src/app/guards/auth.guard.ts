import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service' //'../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService,
               private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      
      return this.usuarioService.validarToken()
                 .pipe(
                   tap( estaAutenticado => {
                     if ( !estaAutenticado ) {
                       this.router.navigateByUrl('/login');                       
                     }
                   })
                 );
  }
  
}
