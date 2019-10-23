import Api from 'shared/core/Api/index';
import request from "request";

import queries from './queries';

const api = new Api({
  url: 'http://192.168.101.155:3003',
  queries,
  request
});

export default api;
