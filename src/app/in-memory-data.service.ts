import { Injectable } from '@angular/core';
import { Hero } from './hero';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Hulk' },
      { id: 2, name: 'Hulk2' },
      { id: 3, name: 'Hulk3' },
      { id: 4, name: 'Hulk4' },
      { id: 5, name: 'Hulk5' },
      { id: 6, name: 'Hulk6' },
      { id: 7, name: 'Hulk7' },
      { id: 8, name: 'Hulk8' },
      { id: 9, name: 'Hulk9' },
      { id: 10, name: 'Hulk10' }
    ];
    return { heroes };
  }


  constructor() { }
  genId(heroes: Hero[]): number{
    return heroes.length> 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11
  }
}
