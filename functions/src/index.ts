import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
exports.triggerUser = functions.auth.user().onCreate((user) => {
  console.log(`user created (${user.uid})`);
  return admin
    .firestore()
    .collection('/users/').doc(user.uid).set({
      email: user.email,
      firstName:'',
      lastName:'',
      phone:'',
      photoURL:'',
      roles: ['user']
    });
});


exports.createArticle = functions.firestore.document('news/{articleId}').onCreate((snap) => {
  return snap.ref.set({
    date: admin.firestore.FieldValue.serverTimestamp(),
  }, {merge: true});
});
