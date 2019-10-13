export default {
  urls: {
    client: {
      port: 3001,
      ip: 'localhost',
      protocol: 'http',
      url: function() { return `${this.protocol}://${this.ip}:${this.port}` }
    },
    server: {
      port: 3002,
      ip: 'localhost',
      protocol: 'http',
      url: function() { return `${this.protocol}://${this.ip}:${this.port}` }
    },
    backend: {
      port: 3003,
      ip: 'localhost',
      protocol: 'http',
      url: function() { return `${this.protocol}://${this.ip}:${this.port}` }
    }
  }
}
