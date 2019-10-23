import Action from '../../core/Action';
import ServerModel from '../../models/ServerModel';
import VError from '../../core/VError';
import configs from '../../configs';

class CreateAction extends Action {
    static async run (req, res, next) {
      const data = req.body.data;
      const server = new ServerModel(data);
      console.log(req.body)
      if (await server.save()) {
        res.json({
          body: {},
          meta: {
            ok: true
          }
        })
      } else {
        throw new VError(configs.errors.DB);
      }
    }
}

export default CreateAction;
