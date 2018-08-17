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

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    TypeComponent,
    VersionsComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
