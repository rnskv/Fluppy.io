import Server from './core/Server';
import Dao from './core/Dao';
import routers from './routers';
import middlewares from './middlewares';
import strategies from './services/auth/strategies';

import configs from './configs';
import globalConfig from './configs/global';


const dao = new Dao();
dao.connect();

const main = new Server({
   port: globalConfig.urls.backend.port,
   host: globalConfig.urls.backend.ip,
   routers,
   middlewares: Object.values(middlewares),
   strategies
});

main.start().then(main.successCb).catch(main.errorCb);
