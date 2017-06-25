# RPS Battle

This is a Rock Paper Scissors game made with vanilla ES6.

The main objectives are to keep it simple yet elegant, extensible and as a tool to profile memory/CPU usage in game made entirely with DOM elements.

## How to get started

1. Download and install [NodeJS](https://nodejs.org/en/)

2. Install GulpJS globally
	```sh
	$ npm install --global gulp-cli
	```

3. Install the dependencies via npm
	```sh
	$ npm install
	```

4. You're good to go!

## Gulp tasks

#### - dev

Task to help development, watching changes in files and reloading browser

#### - default

Build the product for production, consist of a pipeline of all the bundle and copy tasks

#### - Helpers
- **clear**

    Run it to clear the /docs folder (used to host the project in github pages)

- **js**

    Helper function. Run it to bundle the JS in two separate files: app.js (ES6 support needed) and app.compat.js (transpiled with Babel to support older browsers)

- **css**

    Helper function. Run it to bundle and transpile SCSS files into CSS

- **index, images**

    Helper function. Helper tasks for running with browserSync

- **browserSync**

    Helper function. Fires up the browserSync to speed up development process
