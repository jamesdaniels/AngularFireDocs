import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TSDocService, Child } from './tsdoc.service';
import { map, filter } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public component: Observable<Child>;

  constructor(
    private route: ActivatedRoute,
    private tsdoc: TSDocService
  ) {
    combineLatest(route.params, tsdoc.versions).pipe(
      map(([params, versions]) => {
        console.log(params);
        return Object.keys(versions).find(versionKey => {
          const version = versions[versionKey];
          return params.version ? version.version == params.version : version.current;
        })
      })
    ).subscribe(tsdoc.selectedVersionKey);

    this.component = combineLatest(route.params, tsdoc.groups).pipe(
      map(([params, groups]) => {
        const group = groups.find(group => group.title === params.type );
        const child = group.children.find(child => child.name === params.name);
        tsdoc.currentPath.next([group, child]);
        return child;
      })
    );
  }

  ngOnInit() {
  }

}
