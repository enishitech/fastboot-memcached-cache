const memjs = require('memjs');

class MemcachedCache {
  constructor({servers, expiration, cacheKey} = {}) {
    this.client = memjs.Client.create(servers, {
      expires: expiration || 5 * 60
    });

    this.cacheKey = cacheKey || ((path) => path)
  }

  fetch(path, request) {
    const key = this.cacheKey(path, request);

    return new Promise((resolve, reject) => {
      this.client.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  put(path, body, response) {
    const key = this.cacheKey(path, response.req);

    return new Promise((resolve, reject) => {
      if (response.statusCode !== 200) {
        resolve();
        return;
      }

      this.client.set(key, body, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = MemcachedCache;
