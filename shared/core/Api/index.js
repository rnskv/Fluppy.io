class Api {
  constructor({ url, queries, request, defaultOprions = { headers: {} } }) {
    this.url = url;
    this.queries = queries;
    this.options = defaultOprions;
    this.request = request;
    console.log('call api constructor')
  }

  setToken(token) {
    console.log('set token', token);
    this.options.headers['Authorization'] = `Bearer: ${token}`;
  }

  getQuery(queryName) {
    console.log(this.queries, queryName, this);
    return this.queries[queryName]
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

  execute(queryData = { name: 'test.test', params: {}, accessToken: null}, options = {}) {
    return new Promise((resolve, reject) => {
      const query = this.getQuery(queryData.name);
      const url = this.url + query.action(queryData.params);

      const params = {
        method: query.method,
        ...this.options,
        ...options
      };

      if (queryData.accessToken) {
        this.setToken(queryData.accessToken);
      }


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
