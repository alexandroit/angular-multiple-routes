import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { PositionAGMService } from 'src/app/services/PositionAGM/position-agm.service';
import { PositionAGM } from 'src/app/models/position-agm';
import { MapsAPILoader} from '@agm/core';


@Component({
  selector: 'app-child-one',
  templateUrl: './child-one.component.html',
  styleUrls: ['./child-one.component.css']
})
export class ChildOneComponent implements OnInit , AfterContentInit{
  title = 'My first AGM project';

  @ViewChild('gmap', null) gmapElement: any;
  map: google.maps.Map;

  mapPositionAGM: PositionAGM = null;
  gangs: PositionAGM[][] = [];
  positionChange = true;
  started = false;
  localData: PositionAGM[] = [];
  constructor(
    private mapsApiLoader: MapsAPILoader,
    private positionAGMService: PositionAGMService
  ) {
}

ngAfterContentInit(): void {
  this.mapsApiLoader.load().then(() => {
    this.initMap();
  });
}

initMap() {
  this.map = new google.maps.Map(this.gmapElement.nativeElement, {
    zoom: 8,
    center: new google.maps.LatLng(0, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: false,
    streetViewControl: false,
    disableDefaultUI: true,
  });

}
getPoints() {

}
  ngOnInit() {

    this.positionAGMService.getDynamicPosition().subscribe(position => {
      if ( this.map ) {
          this._data(position);
          if ( !this.started ) {
             this.gangs.forEach(t =>  t.forEach( p => {
                this.addMarker(this.map, p);
            }));
          } else {
            const ckeckData: PositionAGM[] = [];
            this.gangs.find( t =>  t.forEach(d => ckeckData.push(d)));
            this.localData.forEach((t, index) => {
              const dataExists  = ckeckData.find(f => f.ID === t.ID);
              if (!dataExists) {
                t.marker.setMap(null);
                delete this.localData[index];
              }
            });
            const newlocalData: PositionAGM[] = [];
            this.localData.forEach(t => {
                if(t) {
                  return newlocalData.push(t);
                }
            });
            this.localData = newlocalData;

            this.gangs.forEach(t =>  t.forEach( p => {
              let temp = this.localData.find((f) => f.ID === p.ID);
              if ( temp ) {
                  temp.latitude = p.latitude;
                  temp.longitude = p.longitude;
                  temp.marker.setPosition({lat: p.latitude, lng: p.longitude});
              } else {
                this.addMarker(this.map, p);
              }
            }));
        }
          this.started = true;
          if (!this.mapPositionAGM) {
            this.mapPositionAGM = position;
          }
          if ( this.positionChange) {
             this.map.setZoom(16);
             this.map.setCenter({lat: position.latitude  + (0.003), lng: position.longitude });
          }

        }
      },
      error => {
        console.log(error);
      }
      );
  }

  private _data(position: PositionAGM) {
    this.gangs = [];
    for (let j = 0; j < 3; j++) {
      let positionStart = new PositionAGM();
      positionStart = Object.assign(positionStart, position);
      positionStart.ID = ((j + 1) * 100);
      const positions: PositionAGM[] = [positionStart];
      let lngDefault = position.longitude + (j / 10000);
      let latDefault = position.latitude - (j / 1000);
      for (let i = 0; i < 100; i++) {
        let positionZ: PositionAGM = new PositionAGM();
        positionZ = Object.assign(positionZ, positions[positions.length - 1]);
        positionZ.ID++;
        if (i % 2 === 0) {
          latDefault = positionZ.latitude += 0.0009;
          positionZ.latitude = latDefault;
        } else {
          lngDefault = positionZ.longitude += 0.0009;
          positionZ.longitude = lngDefault;
        }

        positions.push(positionZ);
      }
      this.gangs.push(positions);
    }
  }

  addMarker(map: google.maps.Map, positionAGM: PositionAGM) {
    positionAGM.marker =  new google.maps.Marker({
      position: {lat: positionAGM.latitude, lng: positionAGM.longitude},
      map,
      clickable: true,
      title: 'Hello World!',
      icon: '/assets/boy.png'
    });
    const infowindow = new google.maps.InfoWindow({
      content: `${positionAGM.ID} - OK`
    });
    positionAGM.marker.addListener('click', () => {
      this.localData.forEach(t => t.infowindow? t.infowindow.close(): null);
      positionAGM.infowindow = infowindow;
      positionAGM.infowindow.open(map, positionAGM.marker);
    });
    this.localData.push(positionAGM);
   }

  fallowPosition() {
    this.positionChange = !this.positionChange;
  }

}
