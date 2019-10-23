export default {
  urls: {
    client: {
      port: 3001,
      ip: '127.0.0.1',
      protocol: 'http',
      url: function() { return `${this.protocol}://${this.ip}:${this.port}` }
    },
    server: {
      port: 3002,
      ip: '127.0.0.1',
      protocol: 'http',
      url: function() { return `${this.protocol}://${this.ip}:${this.port}` }
    },
    backend: {
      port: 3003,
      ip: '127.0.0.1',
      protocol: 'http',
      url: function() { return `${this.protocol}://${this.ip}:${this.port}` }
    }
  }
}
