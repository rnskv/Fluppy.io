import Server from './core/Server';
import Dao from './core/Dao';
import routers from './routers';
import middlewares from './middlewares';
import strategies from './services/auth/strategies';

import configs from './configs';
import servers from 'shared/configs/servers';


const dao = new Dao();
dao.connect();

const main = new Server({
   port: servers.urls.backend.port,
   host: servers.urls.backend.ip,
   routers,
   middlewares: Object.values(middlewares),
   strategies
});

main.start().then(main.successCb).catch(main.errorCb);
