# FastBoot Memcached Cache

This is similar to [tomdale/fastboot-redis-cache](https://github.com/tomdale/fastboot-redis-cache), and its Memcached version.

## Installation

```
$ npm install --save ursm/fastboot-memcached-cache
```

Please install either [`memjs`](https://github.com/alevy/memjs) or [`memcached`](https://github.com/3rd-Eden/memcached) according to your preference.

```
$ npm install --save memjs
(or)
$ npm install --save memcached
```

Tip: Since all Memcached add-ons of Heroku require SASL authentication, you should use `memjs`. Strangely, Memcached in Google App Engine does not work well with `memjs`.

## Usage

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

This option is passed directly to `memjs` or `memcached`. See the documentation of those libraries.

Default: `localhost:11211`

### `expiration` (optional)

The period until the cache expires (in seconds). If you specify `0`, it will be indefinitely.

Default: `300`

### `cacheKey` (optional)

A function for generating a cache key. The path and request object are passed as arguments.

Default: `((path) => path)`
