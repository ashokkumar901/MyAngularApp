import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { HEROES } from '../mockheroes';
import { Hero } from '../hero';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  heroes: Hero[];
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

}
