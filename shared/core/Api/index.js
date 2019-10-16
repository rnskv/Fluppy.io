const methods = {
  'players.get': {
    method: 'GET',
    url: '/players',
  }
};

class Api {
  constructor({ url, methods, request }) {
    this.url = url;
    this.methods = methods;
    this.headers = new Headers();
    this.request = request;
  }

  setToken(token) {
    this.headers.append('Authorization', `Bearer: ${token}`);
  }

  getMethod(methodName) {
    return this.methods[methodName]
  }

  fetch(url, options = {}) {
    options.uri = url;

    return new Promise((resolve, reject) => {
      console.log(url)
      this.request(options, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response)
        }
      })
    })
  }

  execute(methodName, options) {
    return new Promise((resolve, reject) => {
      const method = this.getMethod(methodName);
      const url = this.url + method.action;

      this.fetch(url, options)
        .then(data => resolve(JSON.parse(data.response)))
        .catch(err => reject(err))
    })
  }
}


export default Api;
