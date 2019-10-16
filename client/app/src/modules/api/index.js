import Api from 'shared/core/Api/index';
import bRequest from "browser-request";

import methods from './methods';

const api = new Api({
  url: 'http://192.168.101.155:3003',
  methods,
  request: bRequest
});

export default api;
