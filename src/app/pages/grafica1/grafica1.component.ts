import { Component} from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels0: string[] = ['Clientes', 'Conformes', 'Inconformes'];
  public data0 = [
    [1000,625,375],
  ];

  public labels1: string[] = ['Queso', 'Vino', 'Pan'];
  public data1 = [
    [60,45,100],
  ];

}
