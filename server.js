const fs = require('fs');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 7000;
const express = require('express');
const app = express();
const { createBundleRenderer } = require('vue-server-renderer');
const favicon = require('serve-favicon');
const resolve = file => path.resolve(__dirname, file);

let renderer;

/* ---------------------------------------
   Bootstrap SSR
---------------------------------------- */

if (isProd) {
  // In production: create server renderer using server bundle and index HTML template.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const bundle = require('./v-dist/vue-ssr-server-bundle.json');
  const template = fs.readFileSync(resolve('./v-dist/index.html'), 'utf-8');

  renderer = createBundleRenderer(bundle, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  require('./build/dev-server')(app, (bundle, template) => {
    renderer = createBundleRenderer(bundle, { template });
  });
}


/* ---------------------------------------
   Set up Server
---------------------------------------- */

function serve(path, cache) {
  return express.static(resolve(path), {
    maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
  });
}

function errorHandler(err) {
  if (err && err.code === 404) {
    res.status(404).end('404 | Page Not Found')
  } else {
    // Render Error Page or Redirect
    res.status(500).end('500 | Internal Server Error');
    console.error(`error during render : ${req.url}`);
    console.error(err);
  }
}

app.use('/v-dist', serve('./v-dist', true));
app.use('/service-worker.js', serve('./v-dist/service-worker.js'));
app.use(favicon(path.resolve(__dirname, 'v-src/assets/img/logo.png')));

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.');
  }

  res.setHeader('Content-Type', 'text/html');

  const s = Date.now();

  renderer.renderToStream({ url: req.url })
    .on('error', errorHandler)
    .on('end', () => console.log(`whole request: ${Date.now() - s}ms`))
    .pipe(res);
})


/* ---------------------------------------
   Start Engines
---------------------------------------- */

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
