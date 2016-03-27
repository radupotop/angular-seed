Angular-seed
============

An AngularJS 1.x project seed which aims to keep it simple.

* [Caddy](https://caddyserver.com) for serving http (optional)
* Gulp as the task runner
* Bower for managing front-end assets
* Sass for styles
* Plain JavaScript (Maybe ES6/TypeScript in the future)
* Support for source maps
* Serve Angular templates from the templateCache
* Support for Angular minification with ng-annotate
* JShint scripts
* Support for LiveReload (requires the browser plugin)
* Configure which tasks to run through `gulpconfig.json`


Quick start
-----------

`npm install`  
`bower install`  
`gulp`


Usage
-----

* `gulp` - by default runs the development tasks
* `gulp prod` - build app for production
* `gulp dev`  - build app for development - compile assets, compile app, start server, watch for changes
* `gulp assets` - only compile assets
* `gulp app` - only compile app files
* `gulp serve` - starts a web server on `localhost:2020`
* `gulp watch` - watches scripts for changes, enable livereload
