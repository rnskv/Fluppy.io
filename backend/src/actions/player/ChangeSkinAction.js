import Action from '../../core/Action';
import UserModel from '../../models/UserModel';
import VError from '../../core/VError';
import configs from '../../configs';

class ChangeSkinAction extends Action {
  static async run (req, res, next) {
    const { skin } = req.body;

    console.log(skin);

    UserModel.updateOne({ _id: req.user._id },
      {
        $set: {
          skin: skin
        }
      })
      .then(() => {
        res.json({
          body: {},
          meta: { ok: true }
        })
      })
      .catch(e => {
        //@todo заменить на актуальную ошибку
        throw new VError(configs.errors.DB);
      });
  }
}

export default ChangeSkinAction;
