import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  tabLinks = [
    { label: 'Home', path: 'home' },
    { label: 'AddressList', path: 'list' },
    { label: 'About us', path: 'about' }

  ];
}
