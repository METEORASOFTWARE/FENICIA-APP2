// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: `https://fenicia.meteoracolombia.co/4p1/`,
  token : {
    api : `https://fenicia.meteoracolombia.co:8443/realms/meteora/protocol/openid-connect/token`,
    username : `wsm3t30r4.!2023`,
    password : `gmt;g2F4$(k;E}w`,
    grant_type : `password`,
    client_id : `meteora_ws`
  },
  wsUrl: `http://fenicia.meteoracolombia.co:5000`,
  versionFenicia:  `2.03.248`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
