import CC from './CommonClass';

class Router extends CC {
    executeAction(action, securityLevel) {
        return async (req, res, next) => {
            try {
                req.securityLevel = securityLevel;
                await action.run(req, res, next);
            } catch (err) {
                console.log('executeAction error', err)
                res.send(err)
            }
        }
    }
}

export default Router;
