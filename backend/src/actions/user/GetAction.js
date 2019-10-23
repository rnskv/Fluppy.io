import Action from '../../core/Action';
import UserModel from '../../models/UserModel';
import VError from '../../core/VError';
import configs from '../../configs';

class GetAction extends Action {
    static async run (req, res, next) {
        const uid = req.params.id;
        const user = await UserModel.findOne({uid: uid});
        if (user) {
          res.json({
            body: user,
            meta: { ok: true }
          })
        } else {
          throw new VError(configs.errors.DB);
        }
    }
}

export default GetAction;
