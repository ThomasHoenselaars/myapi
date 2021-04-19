import { db } from '../index';
import { ExpressRoute } from '../types/ExpressRoute';

export const readById: ExpressRoute = async (req, res) => {
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
}