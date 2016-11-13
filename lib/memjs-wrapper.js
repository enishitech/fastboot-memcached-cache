class MemjsWrapper {
  constructor(memjs, {servers, expires}) {
    this.client = memjs.Client.create(servers, {expires});
  }

  get(key, cb) {
    this.client.get(key, cb);
  }

  set(key, value, cb) {
    this.client.set(key, value, cb);
  }
}

module.exports = MemjsWrapper;
