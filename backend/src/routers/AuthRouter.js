import Router from '../core/Router';
import passport from 'passport';
import app from '../configs/app';

import { Router as ERouter } from 'express'
import actions from '../actions/auth';
import servers from 'shared/configs/servers';

const router = ERouter();

class AuthRouter extends Router {
    get router() {
        const { executeAction } = this;
        router.get('/auth', (req, res) => res.send('hello world auth user'));
        router.post('/auth/vk', executeAction(actions.VkAuthAction));

        router.get('/auth/vk', passport.authenticate('vkontakte'));

        router.get('/auth/vk/callback', passport.authenticate('vkontakte', { failureRedirect: '/auth/vk' }),
          function(req, res) {
            // Successful authentication, redirect home.
            res.redirect(servers.urls.client.url() + '/auth/' + req.user.accessToken);
          });

        return router;
    }
}

export default new AuthRouter();
