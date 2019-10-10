import Server from './core/Server';
import Dao from './core/Dao';
import routers from './routers';
import middlewares from './middlewares';
import strategies from './services/auth/strategies';

import configs from './configs';
import globalConfig from './configs/global';


const dao = new Dao();
dao.connect();

const app = new Server({
   port: globalConfig.urls.backend.port,
   host: globalConfig.urls.backend.ip,
   routers,
   middlewares: Object.values(middlewares),
   strategies
});

app.start().then(app.successCb).catch(app.errorCb);
