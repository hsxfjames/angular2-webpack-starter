import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Hero } from './heroes';

@Injectable()
export class HeroService {

  private heroesUri = 'app/heroesData'; // uri 就是imd CreateDb时返回对象的键值
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http
  ) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUri, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUri)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve => setTimeout(resolve, 800))
           .then(() => this.getHeroes());
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  }

  update(hero: Hero): Promise<Hero> {
    const uri = `${this.heroesUri}/${hero.id}`;
    return this.http
      .put(uri, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  delete(heroId: number): Promise<void> {
    const uri = `${this.heroesUri}/${heroId}`;
    return this.http.delete(uri, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
