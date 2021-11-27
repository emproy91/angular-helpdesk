import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
// (control + punto) para implementar el destroyer .
export class BreadcrumbsComponent implements OnDestroy {
  
  public titulo!: string;
  public tituloSubs$: Subscription;

  constructor( private router: Router) { 
     // console.log( route.snapshot.children[0].data);
     this.tituloSubs$ = this.getArgumentosRuta();
                            
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
  getArgumentosRuta() {
    return this.router.events
    .pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data )
    )
    .subscribe( ({ titulo }) =>{
      this.titulo = titulo;
      document.title = `HelpDesk - ${ titulo }`;
    });     
  }

}
