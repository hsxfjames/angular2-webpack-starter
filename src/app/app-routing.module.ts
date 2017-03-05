import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './pages/dashboard/dashboard.component';
import { HeroListComponent }    from './pages/hero-list/hero-list.component';
import { HeroDetailComponent }  from './pages/hero-detail/hero-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hero-list', component: HeroListComponent },
  { path: 'hero-detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
  // providers:    [ ]
})
export class AppRoutingModule { }
