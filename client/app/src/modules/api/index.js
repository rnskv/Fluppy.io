class Api {
  constructor() {

  }

  request(url, options) {
    new Request(url , options).execute();
  }
}

class Request {
  constructor(url, options) {
    this.accessToken = window.localStorage.getItem('accessToken');
    this.options = options;
    this.url = url;
  }

  execute() {
    window.fetch(this.url, {
      ...this.options,
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${this.accessToken}`
      })
    })
    .then((data) => console.log('All ok', data))
    .catch((err) => console.log('All bad', err))
  }

}

