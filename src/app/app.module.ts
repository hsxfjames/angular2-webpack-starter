import './rxjs-extensions';

import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './pages/dashboard/dashboard.component';
import { HeroListComponent }    from './pages/hero-list/hero-list.component';
import { HeroDetailComponent }  from './pages/hero-detail/hero-detail.component';
import { HeroSearchComponent }  from './pages/hero-search/hero-search.component';
import { HeroService }          from './providers/heroes/hero.service';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './providers/in-memory-data/in-memory-data.service';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroListComponent,
    HeroDetailComponent,
    HeroSearchComponent
  ],
  bootstrap:    [ AppComponent ],
  providers:    [ HeroService ]
})
export class AppModule { }
