import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { TSDocService } from './tsdoc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    private route: ActivatedRoute,
    private tsdocs: TSDocService
  ) {
    console.log(route);
    combineLatest(route.params, tsdocs.versions).pipe(
      map(([params, versions]) => {
        console.log(params);
        return Object.keys(versions).find(versionKey => {
          const version = versions[versionKey];
          return params.version ? version.version == params.version : version.current;
        })
      })
    ).subscribe(tsdocs.selectedVersionKey);
  }
}
