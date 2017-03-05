import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs';

import { Hero }           from '../heroes/heroes';

@Injectable()
export class HeroSearchService {

  constructor(
    private http: Http
  ) { }

  search(term: string): Observable<Hero[]> {
    return this.http.get(`app/heroesData/?name=${term}`)
             .map((res: Response) => res.json().data as Hero[]);
  }
}
