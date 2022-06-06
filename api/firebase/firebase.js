const admin = require('firebase-admin');
const database = require('firebase-admin/database');
const credential = require('./credential.json');

admin.initializeApp({
  credential: admin.credential.cert(credential),
  databaseURL: 'https://monopoly-236a1-default-rtdb.firebaseio.com',
});
exports.db = database.getDatabase();
