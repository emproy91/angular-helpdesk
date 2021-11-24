import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
/*Traido de : valor-software.com/ng2-charts/#/GeneralInfo . para usar en global poner en app module . */

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
