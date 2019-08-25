import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChildOneComponent } from './components/father/child-one/child-one.component';
import { ChildTwoComponent } from './components/father/child-two/child-two.component';
import { ChildThreeComponent } from './components/father/child-three/child-three.component';
import { ChildFourComponent } from './components/father/child-four/child-four.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'father'
  },
  { path: 'child-one', component: ChildOneComponent, data: { state : 0}},
  { path: 'child-two', component: ChildTwoComponent, data: { state : 1}},
  { path: 'child-three', component: ChildThreeComponent, data: { state : 2}},
  { path: 'child-four', component: ChildFourComponent,  data: { state : 3}},

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
