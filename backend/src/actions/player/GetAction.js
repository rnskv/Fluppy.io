import Action from '../../core/Action';
import UserModel from '../../models/UserModel';
import VError from '../../core/VError';
import configs from '../../configs';

class GetAction extends Action {
  static async run (req, res, next) {
    res.json({
      body: req.user,
      meta: {ok: true}
    })
  }
}

export default GetAction;
