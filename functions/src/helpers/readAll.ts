import { QuerySnapshot } from '@firebase/firestore-types';
import { ItemModel } from '../models/ItemModel';
import { db } from '../index';
import { ExpressRoute } from '../types/ExpressRoute';

export const readAll: ExpressRoute = async (_, res) => {
  try {
    const query = db.collection('items');
    const response: ItemModel[] = [];

    await query.get().then((querySnapshot: QuerySnapshot) => {
      const docs = querySnapshot.docs;

      for (const doc of docs) {
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
}