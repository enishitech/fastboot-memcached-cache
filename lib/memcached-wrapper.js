class MemcachedWrapper {
  constructor(Memcached, {servers, expires}) {
    this.client   = new Memcached(servers);
    this.lifetime = expires;
  }

  get(key, cb) {
    this.client.get(key, cb);
  }

  set(key, value, cb) {
    this.client.set(key, value, this.lifetime, cb);
  }
}

module.exports = MemcachedWrapper;
