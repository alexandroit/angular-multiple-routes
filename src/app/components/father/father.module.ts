import { AppFatherRoutingModule } from './app-father-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildOneComponent } from './child-one/child-one.component';
import { ChildTwoComponent } from './child-two/child-two.component';
import { ChildThreeComponent } from './child-three/child-three.component';
import { ChildFourComponent } from './child-four/child-four.component';
import { FatherComponent } from './father/father.component';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';


@NgModule({
  declarations: [ChildOneComponent, ChildTwoComponent, ChildThreeComponent, ChildFourComponent, FatherComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    AppFatherRoutingModule
  ],
  exports: [

  ],
  providers: [
    GoogleMapsAPIWrapper
  ]
})
export class FatherModule { }
