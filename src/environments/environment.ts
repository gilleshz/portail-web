export const APIKEY = 'AIzaSyAJ2M7YaYOv2iTOB8PUa1_osEmfLogWgrU';
export const PROJECTID = 'portail-web-7c9e4';

export const environment = {
  production: false,
  firebase: {
    apiKey: APIKEY,
    authDomain: `${PROJECTID}.firebaseapp.com`,
    databaseURL: `https://${PROJECTID}.firebaseio.com`,
    projectId: PROJECTID,
    storageBucket: `${PROJECTID}.appspot.com`,
    // messagingSenderId: `<your-messaging-sender-id>`
  }
};
