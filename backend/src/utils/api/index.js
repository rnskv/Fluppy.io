import Api from 'shared/core/Api/index';
import request from "request";

import queries from './queries';

const api = new Api({
  url: 'http://127.0.0.1:3003',
  queries,
  request
});

export default api;
