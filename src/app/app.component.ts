import { Component } from '@angular/core';
import {
  trigger,
  transition,

  style,
  query,
  group,
  animateChild,
  animate,
  keyframes
} from '@angular/animations';
import { RouterOutlet, ActivatedRoute } from '@angular/router';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
          optional: true,
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
          optional: true,
      }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
          optional: true,
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
          optional: true,
      }),
  ]),
];


@Component({
  selector: 'app-root',

  animations: [
    trigger('animRoutes', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ] , // register the animations
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'routers';
  constructor( private route: ActivatedRoute ) { }
  animationState: number;

  onActivate(outlet: RouterOutlet) {
    this.animationState = this.route.firstChild.snapshot.data.state;
    console.log( this.animationState );
  }
}
