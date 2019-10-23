import Action from '../../core/Action';
import UserModel from '../../models/UserModel';
import VError from '../../core/VError';
import configs from '../../configs';

class UpdateAction extends Action {
  static async run (req, res, next) {
    const { set } = req.body;
    const { id } = req.params;

    UserModel.updateOne({ _id: id }, { $set: set })
      .then(() => {
        console.log('update player')
        res.send({text: 'update action'})
      })
      .catch(e => {
        console.log(e)
        res.send(e)
      });
  }
}

export default UpdateAction;
