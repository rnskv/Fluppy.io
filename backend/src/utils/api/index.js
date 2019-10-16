import Api from 'shared/core/Api/index';
import request from "request";

import methods from './methods';

const api = new Api({
  url: 'http://192.168.101.155:3003',
  methods,
  request
});

export default api;
