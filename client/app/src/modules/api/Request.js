class Request {
    constructor(url, options) {
        this.accessToken = window.localStorage.getItem('accessToken');
        this.options = options;
        this.url = url;
    }

    execute() {
        const headers = new Headers();
        headers.append({
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${this.accessToken}`
        });

        window.fetch(this.url, {
          ...this.options,
          headers
        })
        .then((data) => console.log('All ok', data))
        .catch((err) => console.log('All bad', err))
    }
}

export default Request;
