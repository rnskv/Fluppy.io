class Api {
  constructor({ url, methods, request }) {
    this.url = url;
    this.methods = methods;
    this.headers = {};
    this.request = request;
  }

  setToken(token) {
    console.log('set token', token);
    this.headers['Authorization'] = `Bearer: ${token}`;
  }

  getMethod(methodName) {
    return this.methods[methodName]
  }

  fetch(url, options = {}) {
    options.uri = url;

    return new Promise((resolve, reject) => {
      this.request(options, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response)
        }
      })
    })
  }

  processFetchedData(data) {
    const json = JSON.parse(data.body);

    return {
      isError: data.status > 300 || data.status < 200,
      json
    }
  }

  processFetchedError(error) {
    //тут подбираем подходящую пользовательскую ошибку
    return {
      error: {
        code: "UNEXPECTED_ERROR",
        message: "Unexpected error",
        status: 500,
      }
    }
  }

  execute(methodName, options) {
    return new Promise((resolve, reject) => {
      const method = this.getMethod(methodName);
      const url = this.url + method.action;
      const params = {
        headers: this.headers,
        ...options
      };

      this.fetch(url, params)
        .then(data => {
          const result = this.processFetchedData(data);

          if (result.isError) {
            reject(result.json)
          } else {
            resolve(result.json)
          }

        })
        .catch(err => {
          const error = this.processFetchedError(err);
          reject(error)
        })
    })
  }
}


export default Api;
