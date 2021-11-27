import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

// sitio de los operators http://reactivex.io/documentation/operators.html .

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
// En "RxjsComponent" de aquí abajo car CTRL + . (control + punto) para iimplementar el destroy más abajo .
export class RxjsComponent implements OnDestroy{  

  public intervalSubs: Subscription;

  constructor() { 

    // this.retornaObservable().pipe(
    //   // El pipe alarga el tubo transformando la info del observable o reintentandolo antes de mostrar el error.
    //   retry(2)

    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.warn('Error: ', error),
    //   () => console.info('Obs terminado') // Complete sin argumentos.
    // );
    this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
      
  }
  // El destroy se usa para observables ruidosos con demasiados valores emitidos,
  // en este caso solo se ejecutan este componente o página.
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(500)
                        .pipe(
                          take(10),
                          map( valor => valor + 1 ),
                          filter( valor => (valor % 2 === 0)? true : false ),
                        );

    return intervalo$;
  }

  retornaObservable(): Observable<number> {

    let i = -1;

    return new Observable<number> ( observer => {

      const intervalo = setInterval ( () => {

        i++;
        observer.next(i);

        if ( i == 3 ) {
          clearInterval( intervalo ); // Cancelar el intervalo.
          observer.complete(); // Ok, ya se terminó, no voya a bloquear la memoria.
        }
        // Disparando el error a drede
        if ( i == 2 ) {
          // console.log( ' i es 2 WTF!!');
          observer.error('i solo llegó a 2');
        }
      }, 1000)
    });
    
  }

}
