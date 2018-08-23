import { NgModule } from '@angular/core';
import { KitchenSinkComponent } from './kitchen-sink.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: KitchenSinkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchenSinkRoutingModule { }
