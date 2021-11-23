import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
/*Traido de : valor-software.com/ng2-charts/#/GeneralInfo . para usar en global poner en app module .
*/
// Modulos hechos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
// modulos hechos.

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    RouterModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ChartsModule,
    RouterModule,
    ComponentsModule
    
  ]
})
export class PagesModule { }
