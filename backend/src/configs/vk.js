import app from './app';
import servers from "shared/configs/servers";

export default {
    clientID: 7163980,
    clientSecret: 'bjGIRHQtGTOyoSA349VX',
    callbackURL: `${servers.urls.backend.url()}/auth/vk/callback`
}
