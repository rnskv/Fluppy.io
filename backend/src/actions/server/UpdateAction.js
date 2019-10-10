import Action from '../../core/Action';
import UserModel from '../../models/UserModel';
import VError from '../../core/VError';
import configs from '../../configs';

class UpdateAction extends Action {
  static async run (req, res, next) {
    const { set } = req.body;
    const { id } = req.params;

    //
    UserModel.updateOne({ _id: id }, { $set: set })
      .then(() => { res.send({text: 'update action'}) })
      .catch(e => { res.send(e)});

    // res.json({hello: 'world'})
  }
}

export default UpdateAction;
