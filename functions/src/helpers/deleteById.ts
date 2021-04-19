import { ExpressRoute } from '../types/ExpressRoute';
import { db } from '../index';

export const deleteById: ExpressRoute = async (req, res) => {
  try {
    const query = req.params.item_id;
    const document = db.collection('items').doc(query);

    await document.delete();

    return res.status(200).send(`Item deleted: ${query}`);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}