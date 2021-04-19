import { ExpressRoute } from '../types/ExpressRoute';
const admin = require('firebase-admin');

export const isAuthenticated: ExpressRoute = async (req, res, next) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(req.headers.authorization?.split('Bearer ')[1]);

    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
    }

    next();

    return;
  } catch (err) {
    console.error(`${err.code} - ${err.message}`)
    return res.status(401).send({ message: err })
  }
}