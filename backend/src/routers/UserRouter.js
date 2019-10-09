import Router from '../core/Router';
import { Router as ERouter } from 'express'
import actions from '../actions/user';
import JWTMiddleware from '../middlewares/JWTMiddleware';

const router = ERouter();

class UserRouter extends Router {
    get router() {
        const { executeAction } = this;

        router.post('/users', executeAction(actions.CreateAction));
        router.get('/users', JWTMiddleware.handler(), executeAction(actions.GetListAction));
        router.get('/users/:id', executeAction(actions.GetAction));
        router.delete('/users/:id', executeAction(actions.DeleteAction));
        router.put('/users/:id', executeAction(actions.UpdateAction));

        return router;
    }
}

export default new UserRouter();
