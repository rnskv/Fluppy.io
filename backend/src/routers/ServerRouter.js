import Router from '../core/Router';
import { Router as ERouter } from 'express'
import actions from '../actions/server';
import JWTMiddleware from '../middlewares/JWTMiddleware';

const router = ERouter();

class ServerRouter extends Router {
  get router() {
    const { executeAction } = this;

    router.post('/servers', executeAction(actions.CreateAction));
    router.get('/servers', executeAction(actions.GetListAction));
    router.put('/servers/:id', executeAction(actions.UpdateAction));

    return router;
  }
}

export default new ServerRouter();
