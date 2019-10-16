import PassportVk from 'passport-vkontakte';
import configs from '../../../configs'
import request from 'request';
import servers from 'shared/configs/servers';

import api from 'src/utils/api';

const PassportVkStrategy = new PassportVk.Strategy(
    {
        clientID:     configs.vk.clientID,
        clientSecret: configs.vk.clientSecret,
        callbackURL:  configs.vk.callbackURL
    },
    async (accessToken, refreshToken, params, profile, done) => {

      const options = {
        body: {
          accessToken,
          refreshToken,
          params,
          profile
        }
      };

      //ИЗМЕНИТЬ

      api.execute('auth.vk', options)
        .then((data) => {
          console.log('wtf')
          done(null, data.body)
        })
        .catch((err) => console.log('Err in auth.vk', err));
    }
);

export default PassportVkStrategy;
