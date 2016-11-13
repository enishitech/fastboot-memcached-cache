# FastBoot Memcached Cache

This is similar to [tomdale/fastboot-redis-cache](https://github.com/tomdale/fastboot-redis-cache), and its Memcached version.

``` js
const FastBootAppServer = require('fastboot-app-server');
const MemcachedCache    = require('fastboot-memcached-cache');

const cache = new MemcachedCache({
  servers: 'localhost:11211',
  expiration: 5 * 60,

  cacheKey(path, request) {
    return path;
  }
});

const server = new FastBootAppServer({
  cache
});
```

## Configuration Options

### `servers` (optional)

This library uses [MemJS](https://github.com/alevy/memjs) as the backend, so please refer to that.

Default: `localhost:11211`

### `expiration` (optional)

The period until the cache expires (in seconds). If you specify `0`, it will be indefinitely.

Default: `300`

### `cacheKey` (optional)

A function for generating a cache key. The path and request object are passed as arguments.

Default: `((path) => path)`
