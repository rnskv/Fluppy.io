import Action from '../../core/Action';
import ServerModel from '../../models/ServerModel';
import VError from '../../core/VError';
import configs from '../../configs';

class GetAction extends Action {
    static async run (req, res, next) {
        const uid = req.params.id;
        const server = await ServerModel.findOne({_id: id});
        if (server) {
          res.json({
            body: server,
            meta: { ok: true }
          })
        } else {
          throw new VError(configs.errors.DB);
        }
    }
}

export default GetAction;
