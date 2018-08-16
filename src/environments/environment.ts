// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAGYEWb8zRP_FIVe1ZDHQQBgCZmNZeodZY",
    authDomain: "afdocsite.firebaseapp.com",
    databaseURL: "https://afdocsite.firebaseio.com",
    projectId: "afdocsite",
    storageBucket: "afdocsite.appspot.com",
    messagingSenderId: "498350953660"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
