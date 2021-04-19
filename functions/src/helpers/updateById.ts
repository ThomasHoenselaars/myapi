import { db } from '../index';
import { ExpressRoute } from '../types/ExpressRoute';

export const updateById: ExpressRoute = async (req, res) => {
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
}