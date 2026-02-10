import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
  animateChild,
  keyframes
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('LoginPage <=> RegisterPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0
      })
    ], { optional: true }),

    query(':enter', [
      style({
        transform: 'scale(0.8)',
        opacity: 0
      })
    ], { optional: true }),

    group([
      query(':leave', [
        animate('300ms ease-out', style({
          transform: 'scale(0.8)',
          opacity: 0
        }))
      ], { optional: true }),

      query(':enter', [
        animate('600ms ease-out', keyframes([
          style({ transform: 'scale(1.1)', opacity: 1, offset: 0.4 }),
          style({ transform: 'scale(0.95)', opacity: 1, offset: 0.7 }),
          style({ transform: 'scale(1)', opacity: 1, offset: 1.0 }),
        ]))
      ], { optional: true })
    ])
  ])
]);
