import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    const  url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    // const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    console.log('Settings Service init');
   }

  changeTheme(theme: string) {
    // const linkTheme = document.querySelector('#theme'); // Se pasó abajo de la clase.
    const url = `./assets/css/colors/${ theme }.css`;
    // console.log(url);
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();

  }

  checkCurrentTheme(): void {

    const links = document.querySelectorAll('.selector');

    links.forEach( elem => {

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-Theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {

        elem.classList.add('working');
        
      }
    });
  }
}
