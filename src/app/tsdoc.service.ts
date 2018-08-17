import { Injectable } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

interface PersistedGroup {
  kind: number;
  title: string;
  children: number[];
}

// TODO break this up
export interface Child {
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
  children: Child[];
}

interface Version {
  version: string;
  prerelease: boolean;
  current: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TSDocService {
  versions: Observable<{[key: string]: Version}>;
  groups: Observable<Group[]>;
  selectedVersionKey = new BehaviorSubject<string>(undefined);
  currentPath = new BehaviorSubject<(Group|Child)[]>(undefined);
  selectedVersion: Observable<Version>;
  selectedComponent: Observable<Child>;

  constructor(private db: AngularFireDatabase) {
    this.versions = db.list<Version>('versions').snapshotChanges().pipe(
      map(actions => actions.reduce((versions, action) => {
        versions[action.key] = action.payload.val();
        return versions;
      }, {})),
      shareReplay(1)
    );

    this.selectedVersion = combineLatest(this.selectedVersionKey, this.versions).pipe(
      map(([selectedVersionKey, versions]) => versions[selectedVersionKey]),
      shareReplay(1)
    )

    this.groups = this.selectedVersionKey.pipe(
      switchMap(versionKey => combineLatest(
        db.list<PersistedGroup>(`${versionKey}/groups`).valueChanges(),
        db.list<Child>(`${versionKey}/children`).valueChanges(),
      )),
      map(([groups, children]) => groups.map(group => ({
          title: group.title,
          children: group.children.map(childId => 
            children.find(child => child.id === childId)
          )
        }))
      ),
      shareReplay(1)
    );

  }
}
