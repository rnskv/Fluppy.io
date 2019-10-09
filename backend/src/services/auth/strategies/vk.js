import PassportVk from 'passport-vkontakte';
import configs from '../../../configs'

const PassportVkStrategy = new PassportVk.Strategy(
    {
        clientID:     configs.vk.clientID,
        clientSecret: configs.vk.clientSecret,
        callbackURL:  configs.vk.callbackURL
    },
    function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
        const response = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile
        };
        done(null, response)
    }
);

export default PassportVkStrategy;
