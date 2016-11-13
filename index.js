function requireSafely(module) {
  try {
    return require(module);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      return null;
    } else {
      throw e;
    }
  }
}

function getWrapper(...args) {
  const memjs = requireSafely('memjs');

  if (memjs) {
    const MemjsWrapper = require('./lib/memjs-wrapper');

    return new MemjsWrapper(memjs, ...args);
  }

  const Memcached = requireSafely('memcached');

  if (Memcached) {
    const MemcachedWrapper = require('./lib/memcached-wrapper');

    return new MemcachedWrapper(Memcached, ...args);
  }

  throw new Error("Please add either memjs or memcached to your application's dependencies.")
}

class MemcachedCache {
  constructor({servers, expiration, cacheKey} = {}) {
    this.client = getWrapper({
      servers,
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
