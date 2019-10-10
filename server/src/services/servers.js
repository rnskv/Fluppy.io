import configs from "../../../backend/src/configs";
import request from 'request';
//Замыкания на импортах - зло, но времени нет

class Servers {
  constructor({ host, ip, port}) {
    this.url = `${host}://${ip}:${port}`;
    this.request = request;
  }

  getList() {
    const options = {
      url: this.url + '/servers',
      method: 'GET'
    };

    request.post(options, (err, data) => {
      const response = data.body;
      console.log('get active server list', response)
    });
  }

  add(type) {
    const options = {
      url: configs.app.backendUrl + '/servers',
      method: 'POST',
      json: {
        data: {
          "isActive": true,
          "protocol": configs.app.protocol,
          "ip": configs.app.ip,
          "port": configs.app.port,
          "type": type
        }
      }
    };

    request.post(options, (err, data) => {
      const response = data.body;
      console.log('server inited in databse', response)
    });
  }

  check() {

  }
}

export default Servers;
