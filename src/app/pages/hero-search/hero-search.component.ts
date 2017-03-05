import { Component, OnInit } from '@angular/core';
import { Router }     from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import { Hero }       from '../../providers/heroes/heroes';
import { HeroSearchService } from '../../providers/hero-search/hero-search.service';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ],
  providers: [ HeroSearchService ]
})
export class HeroSearchComponent implements OnInit {

  public heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private router: Router,
    private heroSearchService: HeroSearchService
  ) { }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Hero[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(hero: Hero): void {
    let link = ['/hero-detail', hero.id];
    this.router.navigate(link);
  }
}
