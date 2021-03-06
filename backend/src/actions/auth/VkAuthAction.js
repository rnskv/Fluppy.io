import Action from '../../core/Action';
import UserModel from '../../models/UserModel';
import VError from '../../core/VError';
import configs from '../../configs';
import request from "request";
import servers from "shared/configs/servers";
import api from 'src/utils/api';

class VkAuthAction extends Action {
    static async run (req, res, next) {
      const{ accessToken, profile } = req.body;
      let user = await UserModel.findOne({uid: profile.id}).exec();
      let response;

      if (!user) {
        const profileData = {
          uid: profile._json.id,
          accessToken: accessToken,
          avatar: profile._json.photo,
          name: profile._json.first_name,
          lastName: profile._json.last_name
        };

        api.execute(
          { name: 'users.create' },
          {
            json: { profileData }
          }
        ).then(() => {
          console.log('Create new user');
        });

        response = {
          accessToken: accessToken,
          user: data.body
        };
      } else {
        api.execute(
          {name: 'users.update', params: { id: user._id } },
          {
            json: { set: {accessToken} }
          }
        ).then(() => {
          console.log('Update player user');
        });

        response = {
          accessToken: accessToken,
          user
        };
      }

      res.json({
        body: response
      })
    }
}

export default VkAuthAction;
