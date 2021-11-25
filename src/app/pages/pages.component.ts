import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor( private settingsService: SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
// function customInitFunctions() {
//   throw new Error('Function not implemented.');
// }

