import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [

  // path: '/dashboard' -> PagesRouting
  // path: '/auth' -> AuthRouting
  // path: '/compras' -> ComprasRouting

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent},
];

@NgModule({
  declarations: [], //no se usa
  // Aquí abajo van todos los modulos.
  imports: [
    RouterModule.forRoot( routes, { useHash: false} ), // pone y quita el "...4200/#/login" por ejemplo.
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
