import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail.component';
import { ReadmeComponent } from './readme.component';
//import { KitchenSinkComponent } from './kitchen-sink.component';

const routes: Routes = [
  { path: '', component: ReadmeComponent },
  // Once SSR supports lazy, move to loading children
  { path: 'kitchen-sink', loadChildren: './kitchen-sink.module#KitchenSinkModule' },
  //{ path: 'kitchen-sink', component: KitchenSinkComponent },
  { path: ':version', component: ReadmeComponent },
  { path: ':version/:type/:name', component: DetailComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
