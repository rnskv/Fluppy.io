import Router from '../core/Router';
import passport from 'passport';

import { Router as ERouter } from 'express'
import actions from '../actions/auth';

const router = ERouter();

class AuthRouter extends Router {
    get router() {
        const { executeAction } = this;
        router.get('/auth', (req, res) => res.send('hello world auth user'));

        router.get('/auth/vk', passport.authenticate('vkontakte'));

        router.get('/auth/vk/callback', passport.authenticate('vkontakte', { failureRedirect: '/auth' }),
          function(req, res) {
            // Successful authentication, redirect home.
            console.log(req.user)
            res.redirect('/');
          });

        return router;
    }
}

export default new AuthRouter();
