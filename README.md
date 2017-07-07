# e-motion

## Development setup

### Requirements
* [Node with npm](https://nodejs.org/en/)
* [git](https://git-scm.com/)


### First time setup
1. Open your preferred command line and clone the repo using `git clone https://github.com/DavideBecker/p2-g6-EMotion.git`
1. Use your favorite terminal to navigate to the project folder (Where this readme file is)
1. If you never used gulp run `npm install gulp-cli -g`. This is required to run gulp commands from the terminal.
1. Run `npm install` to install all dependencies. This can take a few minutes.
1. Run `gulp` to build the source files. This will compile and compress JavaScript and CSS files as well as images
1. Now  the project is set up. You can start it by using `./node_modules/.bin/electron .` or install electron globally by using `npm install electron -g` and just run `electron .`

### Developing
While developing you should run `gulp watch`. This will automatically compile files as they are saved as well as reload the electron instance (and a bunch of other cool stuff)

### Linting
This project contains a very strict eslint config. Install an eslint linter for your favorite code editor to get code formatting and syntax error highlights. Gulp also outputs eslint messages to the console

### Gulp tasks
All tasks that alter files in `/src/` output to `assets`
| Command | Action |
|---|---|
| `gulp styles` | Compiles `/src/styles/main.sass` |
| `gulp scripts:lint` | Lints all scripts in `/src/scripts/` except the vendor folder
| `gulp scripts` | Pipes all scripts in `/src/scripts/` through babel and uglifies them. Also runs `scripts:lint` |
| `gulp images` | Minifies all images in `/src/images/`
| `gulp vectors` | Moves all files in `/src/vectors/` |
| `gulp data` | Moves all files in `/src/data/` |
| `gulp fonts` | Moves all files in `/src/fonts/` |
| `gulp watch` | Watches for file changes in the above folders and runs the respective task automatically when a file changes. The images task is excluded from this for performance reasons |
| `gulp clean` | Deletes the `/assets/` folder |
| `gulp` | Runs `styles`, `scripts`, `images`, `vectors`, `data` and `fonts` after running `clean` |
| `gulp pages:clean` | Deletes the `/docs/` folder |
| `gulp pages:generate` | Generates GitHub Pages structure by copying the `/assets/` folder and `index.html` to `/docs/` |
| `gulp pages` | Runs `pages:clean` and then `pages:generate` |


## Creating electron apps
The easiest way to create electron apps is with the node package `electron-packager`. Install it with `npm install electron-packager -g`.

Once installed you can build for all systems by using `electron-packager ./ e-motion --all --overwrite --out=./builds`
