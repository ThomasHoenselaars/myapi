import { FirebaseFirestore, QuerySnapshot,  } from '@firebase/firestore-types';
import { Request, Response, Application } from 'express';
import { serviceAccount } from './permissions';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

interface ItemModel {
  id: string,
  item: string,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://myapi-2eba3..firebaseio.com'
})

const db: FirebaseFirestore = admin.firestore();
const app: Application = express();

app.use(cors({ origin: true }));

// CREATE
app.post('/api/create', (req: Request, res: Response) => {
  (async () => {
      try {
        const { item, id } = req.body;

        await db
          .collection('items')
          .doc(`/${id}/`)
          .set({ item });

        return res.status(200).send(`Item has been added: ${item}`);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
});

// READ ALL
app.get('/api/readall', (_: Request, res: Response) => {
  (async () => {
    try {
      const query = db.collection('items');
      const response: ItemModel[] = [];

      await query.get().then((querySnapshot: QuerySnapshot) => {
        const docs = querySnapshot.docs;

        for (let doc of docs) {
          const selectedItem: ItemModel = {
            id: doc.id,
            item: doc.data().item,
          }

          response.push(selectedItem);
        }
      })

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
})

// READ ID
app.get('/api/read/:item_id', (req: Request, res: Response) => {
  (async () => {
    try {
      const query = req.params.item_id;
      const document = db.collection('items').doc(query);
      const item = await document.get();
      const response = item.data();

    return res.status(200).send(response);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  })();
})

// UPDATE
app.put('/api/update/:item_id', (req: Request, res: Response) => {
  (async () => {
    try {
      const query = req.params.item_id;
      const document = db.collection('items').doc(query);
      const { item } = req.body;

      await document.update({ item });

      return res.status(200).send(`Item updated with: ${item}`);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
})

// DELETE
app.put('/api/delete/:item_id', (req: Request, res: Response) => {
  (async () => {
    try {
      const query = req.params.item_id;
      const document = db.collection('items').doc(query);

      await document.delete();

      return res.status(200).send(`Item deleted: ${query}`);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
})

exports.app = functions.https.onRequest(app);

