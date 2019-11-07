import Api from 'shared/core/Api/index';
import request from "browser-request";

import queries from './queries';
import servers from "shared/configs/servers";

const api = new Api({
  url: servers.urls.backend.url(),
  queries,
  request,
  defaultOptions: {
    headers: {
      'content-type': 'application/json'
    }
  }
});

api.updateOptions({
  autoParseJsonResponse: true
});

export default api;
