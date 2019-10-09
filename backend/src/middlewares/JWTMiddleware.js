import Middleware from "../core/Middleware";
import configs from '../configs';
import UserModel from '../models/UserModel';
import VError from "../core/VError";

class JWTMiddleware extends Middleware {
  init() {
    console.log(`jwt middleware ${this.constructor.name}`)
  }

  handler() {
    return async (req, res, next) => {
      let user = await UserModel.findOne({accessToken: req.headers.accessToken}).exec();
      if (user) {
        req.user = user;
        next();
      } else {
        res.json({
          error: configs.errors.ACCESS
        });
      }
    }
  }
}

export default new JWTMiddleware();
