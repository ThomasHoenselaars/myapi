import { db } from '../index';
import { ExpressRoute } from '../types/ExpressRoute';

export const create: ExpressRoute = async (req, res) => {
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
}