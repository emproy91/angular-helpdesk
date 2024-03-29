import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-acccount-settings',
  templateUrl: './acccount-settings.component.html',
  styles: [],
})
export class AcccountSettingsComponent implements OnInit {

  //public linkTheme = document.querySelector('#theme');
  //public links!: NodeListOf<Element>;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }
  changeTheme(theme: string) {
    this.settingsService.changeTheme( theme ); 
  }

}
