import Request from './Request';

class Api {
  constructor() {
    this.requests = [];
  }

  request(url, options) {
    const request = new Request(url, options);
    this.requests.push(request);
    request.execute()
  }
}

export default Api;
