# FastBoot Memcached Cache

This is the same one as [tomdale/fastboot-redis-cache](https://github.com/tomdale/fastboot-redis-cache) and is that Memcached version.

``` js
const FastBootAppServer = require('fastboot-app-server');
const MemcachedCache    = require('fastboot-memcached-cache');

const cache = new MemcachedCache({
  servers: 'localhost:11211',
  expiration: 5 * 60, // in seconds

  cacheKey(path, request) {
    return path;
  }
});

const server = new FastBootAppServer({
  cache
});
```
