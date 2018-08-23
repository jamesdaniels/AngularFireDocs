import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireMessagingModule } from 'angularfire2/messaging';
import { AngularFireFunctionsModule } from 'angularfire2/functions';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { KitchenSinkComponent } from './kitchen-sink.component';
import { KitchenSinkRoutingModule } from './kitchen-sink-routing.module';

@NgModule({
  imports: [
    CommonModule,
    KitchenSinkRoutingModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule
  ],
  declarations: [
    KitchenSinkComponent
  ]
})
export class KitchenSinkModule { }
