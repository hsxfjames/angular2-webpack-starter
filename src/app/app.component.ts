import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/hero-list" routerLinkActive="active">Heroes List</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: [ 'app.component.scss' ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
