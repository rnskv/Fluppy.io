import app from './app';
import globalConfig from "./global";

export default {
    clientID: 7163980,
    clientSecret: 'bjGIRHQtGTOyoSA349VX',
    callbackURL: `${globalConfig.urls.backend.url()}/auth/vk/callback`
}
