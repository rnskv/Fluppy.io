import mongoose from 'mongoose';
import Action from '../../core/Action';
import UserModel from '../../models/UserModel';
import VError from '../../core/VError';
import configs from '../../configs';
const ObjectId = mongoose.Types.ObjectId;

class GetAction extends Action {
    static async run (req, res, next) {
        const id = req.params.id;

        const user = await UserModel.aggregate([
          {
            $match : { '_id' : ObjectId(id) }
          },
          // {
          //   $project: {
          //     _id: 1,
          //     inventory: 1
          //   }
          // }
        ]);

        if (user) {
          res.json({
            body: user[0],
            meta: { ok: true }
          })
        } else {
          throw new VError(configs.errors.DB);
        }
    }
}

export default GetAction;
