import Router from '../core/Router';
import { Router as ERouter } from 'express'
import actions from '../actions/player';
import JWTMiddleware from '../middlewares/JWTMiddleware';

const router = ERouter();

class PlayerRouter extends Router {
  get router() {
    const { executeAction } = this;

    router.get('/player', JWTMiddleware.handler(), executeAction(actions.GetAction));
    router.put('/player/totalScores', JWTMiddleware.handler(), executeAction(actions.SetTotalScores));

    return router;
  }
}

export default new PlayerRouter();
