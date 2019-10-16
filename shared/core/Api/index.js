class Api {
  constructor({ url, methods, request, defaultHeaders = {} }) {
    this.url = url;
    this.methods = methods;
    this.headers = defaultHeaders;
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
      this.request(options, (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            response, body
          })
        }
      })
    })
  }

  processFetchedData(data) {
    return {
      isError: data.response.status > 300 || data.response.status < 200,
      body: data.body
    }
  }

  processFetchedError(error) {
    //тут подбираем подходящую пользовательскую ошибку
    return {
      error: {
        code: "UNEXPECTED_ERROR",
        message: "Unexpected error",
        status: 500,
        default: error
      }
    }
  }

  execute(methodName, options = {
    headers: {}
  }) {
    return new Promise((resolve, reject) => {
      const method = this.getMethod(methodName);
      const url = this.url + method.action;
      const params = {
        ...options,
        method: method.method || 'GET',
        json: options.body,
        headers: {
          ...this.headers,
          ...options.headers
        },
      };

      console.log('fetch params', params);

      this.fetch(url, params)
        .then(data => {
          const result = this.processFetchedData(data);

          if (result.isError) {
            reject(result.body)
          } else {
            resolve(result.body)
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
