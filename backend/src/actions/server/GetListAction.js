import Action from '../../core/Action';
import ServerModel from '../../models/ServerModel';
import VError from '../../core/VError';
import configs from '../../configs';

class GetListAction extends Action {
  static async run (req, res, next) {

    const servers = await ServerModel.aggregate([
      { $sort : { isActive : 1 } },
      {
        $project: {
          '_id': 1,
          'isActive': 1,
          'protocol': 1,
          'ip': 1,
          'port': 1,
        }
      }
     ]).exec();

    if (servers) {
      res.json({
        body: servers,
        meta: { ok: true }
      });
    } else {
      throw new VError(configs.errors.DB);
    }
  }
}

export default GetListAction;
