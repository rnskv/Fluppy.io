import Action from '../../core/Action';
import UserModel from '../../models/UserModel';
import VError from '../../core/VError';
import configs from '../../configs';
import request from "request";
import globalConfig from "../../configs/global";

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

        const options = {
          url: globalConfig.urls.backend.url() + '/users',
          method: 'POST',
          json: { profileData: profileData }
        };

        request.post(options, (err, data) => {
          console.log('Create new user', data.body);
        });

        response = {
          accessToken: accessToken,
          user: data.body
        };
      } else {
        const options = {
          url: globalConfig.urls.backend.url() + '/users/' + user._id,
          method: 'PUT',
          json: { set: {accessToken} }
        };

        request.put(options, (err, data) => {
          console.log('Update player user', data.body);
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
