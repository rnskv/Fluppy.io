import express from 'express';
import passport from 'passport';

import bodyParser from 'body-parser';
import cors from 'cors';

import CC from './CommonClass';
import configs from "../configs";
import request from "request";

const whitelist = [undefined, 'http://192.168.0.155:3002', 'http://192.168.101.155:3001', 'http://192.168.101.155:3003']

const corsOptions = {
  origin: '*',
  // function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true)
  //   } else {
  //     console.log('Oooops for', origin)
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // }
};

class Server extends CC {
    constructor(params) {
        super();
        this.params = params;
        this.successCb = this.successCb.bind(this);
    }

    start(params) {
        const {
            port = 9000,
            host = 'localhost',
            routers = [],
            middlewares = [],
            strategies = [],
        } = this.params;

        if (routers.length === 0) {
            throw new Error(`\'routers'\ shoud be an array with non-zero length`)
        }

        if (middlewares.length === 0) {
            throw new Error(`\'middlewares'\ shoud be an array with non-zero length`)
        }

        return new Promise((res, rej) => {

            const app = express();

            app.use(cors(corsOptions));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(passport.initialize());
            app.use(passport.session());

            for (const strategy of strategies) {
                passport.use(strategy)
            }

            passport.serializeUser(function(user, done) {
                done(null, user);
            });

            passport.deserializeUser(function(id, done) {
                done(null, user)
            });

          for (const middleware of middlewares) {
            console.log('Add middleware', middleware.handler)
            app.use(middleware.handler())
          }

            for (const item of routers) {
                app.use(item.router)
            }


            return app.listen(port, host, () => res({port, host}))
        })
    }

    successCb(params) {
      // const options = {
      //   url: configs.app.backendUrl + '/servers',
      //   method: 'POST',
      //   json: {
      //     data: {
      //       "isActive": true,
      //       "protocol": configs.app.protocol,
      //       "ip": configs.app.ip,
      //       "port": configs.app.port,
      //       "type": 1
      //     }
      //   }
      // };
      //
      // request.post(options, (err, data) => {
      //   const response = data.body;
      //   console.log('server inited in databse', response)
      // });

      console.log(
        `******************************************\n****Бэкэнд сервер - ${this.params.host}:${this.params.port}****\n******************************************`
      )
    }

    errorCb(err) {
      console.log(`Server can't start at with error ${err}`)
    }
}

export default Server;
