export default {
  urls: {
    client: {
      port: 3001,
      ip: '192.168.101.155',
      protocol: 'http',
      url: function() { return `${this.protocol}://${this.ip}:${this.port}` }
    },
    server: {
      port: 3002,
      ip: '192.168.101.155',
      protocol: 'http',
      url: function() { return `${this.protocol}://${this.ip}:${this.port}` }
    },
    backend: {
      port: 3003,
      ip: '192.168.101.155',
      protocol: 'http',
      url: function() { return `${this.protocol}://${this.ip}:${this.port}` }
    }
  }
}
