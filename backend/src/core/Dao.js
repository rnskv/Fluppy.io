import CC from './CommonClass';
import mongoose from 'mongoose';
import configs from '../configs';

class Dao extends CC {
    constructor(params) {
        super(params);
        this.params = params;
    }

    connect() {
        mongoose.connect(configs.db.connectUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
          .then(this.successCb)
          .catch(this.errorCb)
    }

    successCb(params) {
        console.log('Mongoose ready.');
    }

    errorCb(error) {
        console.log('Mongoose is not ready.', error);
    }
}

export default Dao;
