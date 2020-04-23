// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://swimappauth.herokuapp.com',
  firebase: {
    apiKey: 'AIzaSyAvgAdnejzqDmSwz2USui_-Gfu4jSHh-v4',
    authDomain: 'swimapp-d4f4a.firebaseapp.com',
    databaseURL: 'https://swimapp-d4f4a.firebaseio.com',
    projectId: 'swimapp-d4f4a',
    storageBucket: 'swimapp-d4f4a.appspot.com',
    messagingSenderId: '418625892306',
    appId: '1:418625892306:web:ff170f869e70cca196620b',
    measurementId: 'G-6QB8J5MGW0'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
