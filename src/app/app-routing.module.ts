import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail.component';
import { ReadmeComponent } from './readme.component';

const routes: Routes = [
  { path: '', component: ReadmeComponent },
  { path: ':version', component: ReadmeComponent },
  { path: ':version/:type/:name', component: DetailComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
