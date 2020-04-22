## Can not find service-server.js

Change swDest in workboxOpts like this:

```js
const withOffline = require('next-offline')
const config = {
  workboxOpts: {
    swDest: '../public/service-worker.js',
  },
	// rest of your config
}
module.exports = withOffline(config)
```

Refering to `https://github.com/hanford/next-offline/issues/229`
