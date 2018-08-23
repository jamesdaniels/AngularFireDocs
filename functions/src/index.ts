import * as functions from 'firebase-functions';

export const reference = functions.https.onRequest((request, response) => {
  require(`${process.cwd()}/dist/afdocsite-webpack/server`).app(request, response);
});

export const test = functions.https.onCall(() => ({success: true}));