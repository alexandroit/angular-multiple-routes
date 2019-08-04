import { Injectable } from '@angular/core';
import { Observable, pipe, timer, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PositionAGM } from 'src/app/models/position-agm';
@Injectable({
  providedIn: 'root'
})
export class PositionAGMService {
  positionAGM: PositionAGM;
  constructor() { }

  public getWatchPosition(): Observable<PositionAGM> {
    const obs = new Observable<PositionAGM>(observer => {

      let watchId: any;

      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(p => observer.next(new PositionAGM(
          p.coords.accuracy,
          p.coords.altitude,
          p.coords.altitudeAccuracy,
          p.coords.heading,
          p.coords.latitude,
          p.coords.longitude,
          p.coords.speed)
        ));
      } else {
        observer.error('Geolocation not available');
      }

      // When the consumer unsubscribes, clean up data ready for next subscription.
      return { unsubscribe() { navigator.geolocation.clearWatch(watchId); } };
    });

    return obs;
  }

  public getDynamicPosition(): Observable<PositionAGM> {
    const obs = new Observable<PositionAGM>(observer => {
      navigator.geolocation.getCurrentPosition(p => observer.next(new PositionAGM(
        p.coords.accuracy,
        p.coords.altitude,
        p.coords.altitudeAccuracy,
        p.coords.heading,
        p.coords.latitude,
        p.coords.longitude,
        p.coords.speed)
      ));

    }).pipe(
      switchMap((t: PositionAGM) => {
        const WalkPosition = 0.0001;
        const position =  timer(0, 5000)
          .pipe(
            switchMap(() => {
              t.latitude += WalkPosition;
              const newPosition = new Observable<PositionAGM>(observer => observer.next( t ));
              return newPosition;
            })
          );

        return position;
      })
    );
    return obs;
  }
}
