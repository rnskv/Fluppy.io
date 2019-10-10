import PassportVk from 'passport-vkontakte';
import configs from '../../../configs'
import request from 'request';
import globalConfig from '../../../configs/global';

const PassportVkStrategy = new PassportVk.Strategy(
    {
        clientID:     configs.vk.clientID,
        clientSecret: configs.vk.clientSecret,
        callbackURL:  configs.vk.callbackURL
    },
    async (accessToken, refreshToken, params, profile, done) => {
      const options = {
        url: globalConfig.urls.backend.url() + '/auth/vk',
        method: 'POST',
        json: {
          accessToken,
          refreshToken,
          params,
          profile
        }
      };

      request.post(options, (err, data) => {
        const response = data.body;
        done(null, response.body);
      });
    }
);

export default PassportVkStrategy;
