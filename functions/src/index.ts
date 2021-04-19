import { FirebaseFirestore } from '@firebase/firestore-types';
import { Application } from 'express';
import { serviceAccount } from './permissions';
import { create } from './helpers/create';
import { readAll } from './helpers/readAll';
import { updateById } from './helpers/updateById';
import { isAuthenticated } from './helpers/isAuthenticated';
import { readById } from './helpers/readById';
import { deleteById } from './helpers/deleteById';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://myapi-2eba3..firebaseio.com'
})

export const db: FirebaseFirestore = admin.firestore();
const app: Application = express();

app.use(cors({ origin: true }));
app.use(morgan('combined'));

// CREATE
app.post('/api/create', isAuthenticated, create);

// READ ALL
app.get('/api/readall', isAuthenticated, readAll)

// READ ID
app.get('/api/read/:item_id', isAuthenticated, readById)

// UPDATE
app.put('/api/update/:item_id', isAuthenticated, updateById)

// DELETE
app.delete('/api/delete/:item_id', isAuthenticated, deleteById)

exports.app = functions.https.onRequest(app);

