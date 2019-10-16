import Api from 'shared/core/Api/index';
import request from "browser-request";

import methods from './queries';

const api = new Api({
  url: 'http://127.0.0.1:3003',
  methods,
  request,
  defaultOptions: {
    headers: {
      'content-type': 'application/json'
    }
  }
});

export default api;
