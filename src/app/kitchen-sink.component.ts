import { Component, OnInit, ApplicationRef, PLATFORM_ID, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireMessaging } from 'angularfire2/messaging';
import { AngularFireFunctions } from 'angularfire2/functions';
import { AngularFireAuth } from 'angularfire2/auth';
import { isPlatformBrowser } from '@angular/common';

import * as firestore from 'firebase/firestore';

@Component({
  selector: 'app-kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.css']
})
export class KitchenSinkComponent implements OnInit {

  rtdbTest: {} = null;
  firestoreTest: {} = null;
  storageTest: string = null;
  fcmTest: string = null;
  functionsTest: any = null;
  authTest: firebase.User = null;

  constructor(
    private appRef: ApplicationRef,
    private rtdb: AngularFireDatabase,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private messaging: AngularFireMessaging,
    private functions: AngularFireFunctions,
    private auth: AngularFireAuth,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    appRef.isStable.subscribe(
      s => console.log('isStable', s)
    );
    rtdb.object('versions/5-0-0-rc-11/packages').valueChanges().subscribe(
      r => this.rtdbTest = r,
      e => console.log("rtdb", e)
    );
    firestore.doc('versions/5.0.0-rc.11').valueChanges().subscribe(
      r => this.firestoreTest = r,
      e => console.log("afs", e)
    );
    if (isPlatformBrowser(platformId)) {
      // TOOD address. Storage is working on first call, but then timing out
      // as if the connection to the server is persisting (and not in the
      // good way, like you want).
      // This also needs xhr2 to work, rather than xmlhttprequest...
      storage.ref('unnamed.gif').getDownloadURL().subscribe(
        r => this.storageTest = r,
        e => console.log("storage", e)
      );
      // TODO address. Now that I'm using the node.cjs libs this is failing
      // server-side. It was working fine with the browser libraries / webpack.
      functions.httpsCallable('test').call({}).subscribe(
        r => this.functionsTest = r,
        e => console.log("functions", e)
      );
    }
    messaging.getToken.subscribe(
      r => this.fcmTest = r,
      e => console.log("fcm", e)
    );
    auth.user.subscribe(
      r => this.authTest = r,
      e => console.log("auth", e)
    );
  }

  ngOnInit() {
  }

}
