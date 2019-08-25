import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildFourComponent } from './child-four/child-four.component';
import { ChildThreeComponent } from './child-three/child-three.component';
import { ChildTwoComponent } from './child-two/child-two.component';
import { FatherComponent } from './father/father.component';
import { ChildOneComponent } from './child-one/child-one.component';

const fatherRoutes: Routes = [
  { path: 'father', component: FatherComponent, data: { state : 'father'},
    children: [
      { path: 'child-one', component: ChildOneComponent, outlet: 'one', data: { state : 'one'}},
      { path: 'child-two', component: ChildTwoComponent, outlet: 'two', data: { state : 'two'}},
      { path: 'child-three', component: ChildThreeComponent, outlet: 'three', data: { state : 'three'}},
      { path: 'child-four', component: ChildFourComponent, outlet: 'four', data: { state : 'four'}}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(fatherRoutes)],
  exports: [RouterModule]
})
export class AppFatherRoutingModule { }
