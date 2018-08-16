import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { combineLatest, Observable, BehaviorSubject, of } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';

interface PersistedGroup {
  kind: number;
  title: string;
  children: number[];
}

// TODO break this up
interface Children {
  id: number;
  kind: number;
  kindString: string;
  name: string;
  sources: {
    character: number,
    fileName: string,
    line: number
  }[];
  groups: Group[];
  flags: {};
  decorators: {}[];
  comment: {};
  signatures: {}[];
}

interface Group {
  title: string;
  children: Children[];
}

interface Version {
  version: string;
  prerelease: boolean;
  current: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  groups: Observable<Group[]>;
  versions: Observable<{[key: string]: Version}>;
  selectedVersionKey = new BehaviorSubject<string>(undefined);
  currentPath = new BehaviorSubject<Children[]>(undefined);
  selectedVersion: Observable<Version>;
  selectedComponent: Observable<Children>;
  constructor(db: AngularFireDatabase) {
    
    this.versions = db.list<Version>('versions').snapshotChanges().pipe(
      map(actions => actions.reduce((versions, action) => {
        versions[action.key] = action.payload.val();
        return versions;
      }, {})),
      shareReplay(1)
    );
    
    this.versions.pipe(take(1)).subscribe(versions => {
      if (this.selectedVersionKey.value == null) {
        const currentVersion = Object.keys(versions).find(key => {
          return versions[key].current;
        });
        this.selectedVersionKey.next(currentVersion);
      }
    });

    this.selectedVersion = combineLatest(this.selectedVersionKey, this.versions).pipe(
      map(([selectedVersionKey, versions]) => versions[selectedVersionKey])
    )

    this.groups = this.selectedVersionKey.pipe(
      switchMap(versionKey => combineLatest(
        db.list<PersistedGroup>(`${versionKey}/groups`).valueChanges(),
        db.list<Children>(`${versionKey}/children`).valueChanges(),
      )),
      map(([groups, children]) => groups.map(group => ({
          title: group.title,
          children: group.children.map(childId => 
            children.find(child => child.id === childId)
          )
        }))
      )
    );

    this.selectedComponent = this.currentPath.pipe(
      map(pathComponents => pathComponents ? pathComponents[pathComponents.length - 1] : undefined)
    );

  }

  selectVersion = (event, version) => {
    event.preventDefault();
    this.selectedVersionKey.next(version.key);
  }

  changePath = (event, pathComponets) => {
    event.preventDefault();
    this.currentPath.next(pathComponets);
  }
}
