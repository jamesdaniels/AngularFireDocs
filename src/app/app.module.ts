import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { DetailComponent } from './detail.component';
import { TypeComponent } from './type.component';
import { VersionsComponent } from './versions.component';
import { GroupsComponent } from './groups.component';
import { ReadmeComponent } from './readme.component';
import { KitchenSinkModule } from './/kitchen-sink.module';
import { KitchenSinkRoutingModule } from './/kitchen-sink-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    TypeComponent,
    VersionsComponent,
    GroupsComponent,
    ReadmeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    KitchenSinkModule,
    KitchenSinkRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
