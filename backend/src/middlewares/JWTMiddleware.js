import Middleware from "../core/Middleware";
import configs from '../configs';
import UserModel from '../models/UserModel';
import VError from "../core/VError";

class JWTMiddleware extends Middleware {
  init() {
    console.log(`jwt middleware ${this.constructor.name}`);
  }

  logError(json) {
    console.log(json);
  }

  errorHandler(req, res) {
    const response = {
      error: configs.errors.ACCESS
    };

    this.logError(response);

    res.status(403).json(response);
  }

  handler() {
    return async (req, res, next) => {
      let headers = req.headers;

      if (!headers.authorization) {
        this.errorHandler(req, res, next);
        return;
      }

      const token = headers.authorization.split('Bearer: ')[1];

      UserModel.findOne({accessToken: token}).exec()
        .then((user) => {
          req.user = user;
          next();
        })
        .catch(() => {
          this.errorHandler(req, res, next)
        });

    }
  }
}

export default new JWTMiddleware();
