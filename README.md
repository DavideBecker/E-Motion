# e-motion

## Development setup

### Requirements
[Node with npm](https://nodejs.org/en/)    
[git](https://git-scm.com/)


### First time setup
1. Open your preferred command line and clone the repo using `git clone https://github.com/DavideBecker/p2-g6-EMotion.git`
1. Use your favorite terminal to navigate to the project folder (Where this readme file is)
1. If you never used gulp run `npm install gulp-cli -g`. This is required to run gulp commands from the terminal.
1. Run `npm install` to install all dependencies. This can take a few minutes.
1. Run `gulp` to build the source files. This will compile and compress JavaScript and CSS files as well as images
1. Now  the project is set up. You can start it by using `./node_modules/.bin/electron .` or install electron globally by using `npm install electron -g` and just run `electron .`

### Developing
While developing you should run `gulp watch`. This will automatically compile files as they are saved as well as reload the electron instance (and a bunch of other cool stuff)


## Project structure
```javascript
.
├─── src
│    ├─── images // All images in here get compressed
│    ├─── scripts // Put .js files in this folder. Libraries etc in ./vendor
│    │    ├─── vendor
│    │    └─── main.js
│    └─── styles
│         └─── main.sass
├─── index.html
└─── main.js
```