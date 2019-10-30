import Api from 'shared/core/Api/index';
import request from "request";

import queries from './queries';
import servers from "shared/configs/servers";

const api = new Api({
  url: servers.urls.backend.url(),
  queries,
  request
});

export default api;
