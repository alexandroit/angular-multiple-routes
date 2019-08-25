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
  map: any;

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


}
getPoints() {

}
  ngOnInit() {


  }

  private _data(position: PositionAGM) {

  }

  addMarker(map: any, positionAGM: PositionAGM) {

   }

  fallowPosition() {
    this.positionChange = !this.positionChange;
  }

}
