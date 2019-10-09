import Action from '../../core/Action';
import UserModel from '../../models/UserModel';
import VError from '../../core/VError';
import configs from '../../configs';

class CreateAction extends Action {
    static async run (req, res, next) {
      const profileData = req.body.profileData;
        const user = new UserModel(profileData);

        if (await user.save()) {
          res.json({profile: user})
        } else {
          throw new VError(configs.errors.DB);
        }
    }
}

export default CreateAction;
