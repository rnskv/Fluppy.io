import CollisionGameObject from "../core/CollisionGameObject";
import settings from "../configs/settings";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

class Player extends CollisionGameObject {
  constructor({ skin, totalScores, isBot, uid, _id, name, socket, ...params }) {
    super({ ...params });
    this.type = 'PLAYER';
    this.uid = uid;
    this._id = _id;
    this.skin = skin;
    this.name = name;

    this.speed = 1;

    this.dx = 0;
    this.dy = 10;
    this.rx = 0;

    this.radius = 15;

    this.pivot = { x: this.width / 2, y: this.height / 2 };
    this.gravity = 9.8;
    this.moveUpRotation = 35;

    this.isBot = isBot;

    this.maxDX = {
      default: 3,
      die: 2
    };

    this.maxDY = {
      default: 12,
      die: 20
    };

    this.isDie = false;

    this.localScores = 0;
    this.lastCheckPointId = null;
    this.totalScores = totalScores;

    this.safeZoneWidth = 500;

    this.isImmortal = false;

    this.socket = socket;
  }

  get clientData() {
    return {
      id: this.id,
      _id: this._id,
      x: this.x,
      y: this.y,
      radius: this.radius,
      pivot: this.pivot,
      rotation: (Math.PI * this.rotation) / 180,
      shape: this.shape.size,
      uid: this.uid,
      name: this.name,
      localScores: this.localScores,
      totalScores: this.totalScores,
      skin: this.skin
    };
  }

  increaseLocalScores(id) {
    if (this.lastCheckPointId !== id) {
      this.lastCheckPointId = id;
      this.localScores += 1;
      this.updateTotalScores();
    }
  }

  onClick() {
    if (this.isDie) return;
    this.dy = -14;
    this.rotation = -40;
    this.y -= 1;
  }

  onCollide(object) {
    switch (object.type) {
      case 'PIPE': {
        this.kill();
        break;
      }
      case 'CHECKPOINT': {
        this.increaseLocalScores(object.id)
      }
    }
    // this.x = object.x - this.width;

  }

  kill() {
    if (this.isDie || this.isImmortal) return;
    this.dx = -2;
    this.rotation = 90;
    this.isDie = true;
    this.dy = -20;
    this.rx = 40;
  }

  updateTotalScores() {
    if (this.localScores > this.totalScores) {
      this.totalScores = this.localScores;

      this.controller.api.execute(
        {
          name: 'player.setTotalScores',
          accessToken: this.socket.playerData.accessToken
        },
        {
          json: { totalScores: this.totalScores }
        }
      ).then(() => {
        console.log('Total scores was changed');
      });
    }
  }

  spawn() {
    this.dy = 0;
    this.dx = 0;
    this.y = 20;
    this.x = 20;
    this.rx = 0;
    this.rotation = 0;
    this.isDie = false;

    this.localScores = 0;
    this.lastCheckPointId = null;
  }

  update(dt) {
    this.rotation += this.rx * dt;
    this.methods.spawnPipe(this.x, 0);
    if (this.dy < this.maxDY.default || (this.isDie && this.dy < this.maxDY.die)) {
      this.dy += 2 * dt;
    }

    if (this.dx < this.maxDX.default && !this.isDie) {
      this.dx += 1 * dt;
    }

    if (this.rotation < this.moveUpRotation) {
      this.rotation += (Math.abs(this.dy) / 2) * dt;
    }

    if (this.y <= settings.map.border.top) {
      this.dy = 20
    }

    if (this.y + this.dy * this.speed * dt < settings.map.border.bottom) {
      this.x += this.dx * this.speed * dt;
      this.y += this.dy * this.speed * dt;
    } else {
      if (this.x > this.safeZoneWidth) {
        this.spawn();
      } else {
        if (this.isDie) {
          this.spawn();
        }
        this.rotation = 0;
        this.isDie = false;
        this.y = settings.map.border.bottom - this.height
      }
    }
  }
}

export default Player;
