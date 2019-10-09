import Middleware from "../core/Middleware";
import configs from '../configs';

class JWTMiddleware extends Middleware {
  init() {
    console.log(`jwt middleware ${this.constructor.name}`)
  }

  handler() {
    return (req, res, next) => {
      console.log('НУ ЧЕ ЕБАНАРОТ НАХУЙ')
      next();
    }
  }
}

export default new JWTMiddleware();
