import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './../hero.service';
import 'rxjs/add/operator/switchMap';
import {Hero} from "./../hero";

@Component({
  selector: 'hero-detail',
  inputs:['hero'],
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div>
        <label>id: </label>{{hero.id}}
      </div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
      <button (click)="save()">Save</button>
      <button (click)="getBack()">Back</button>
    </div>
  `,
  styles: []
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  constructor(
      private heroService: HeroService,
      private route: ActivatedRoute,
      private location: Location
  ) {}
  ngOnInit() {
    this.route.params
        .switchMap((params: Params)=> this.heroService.getHero(+params['id']))
        .subscribe(hero => this.hero = hero);
  }
  getBack(): void {
    this.location.back();
  }

  save(): void{
    this.heroService.update(this.hero)
        .then(() => this.getBack());
  }

}
