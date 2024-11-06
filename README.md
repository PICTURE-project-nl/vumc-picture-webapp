# VUMC PICTURE WEBAPP

This is the repository for the VUmc Picture Webapp code. The application is built using the [Nuxt.js](https://nuxtjs.org/guide) framework, which allows for the creation of Universal [Vue.js](https://vuejs.org/) applications. The webapp serves as the front-end interface for the PICTURE project, providing users with an interactive platform to access and manipulate the PICTURE dataset.
One of the key features of this application is its brain volume rendering capabilities, which are powered by [brainbrowser](https://brainbrowser.cbrain.mcgill.ca/). This feature allows users to visualize and interact with complex brain volume data in a user-friendly manner.
Please note that this application requires a Laravel middleware API to be running on the same server. The code for this API can be found in the [vumc-picture-api repository](https://gitlab.com/picture-activecollective/vumc-picture-api). This API is responsible for handling various backend operations and providing the necessary data to the front-end application.

Before starting with this project, it is recommended to familiarize yourself with both the front-end and the API codebases to fully understand how they interact with each other.

## INDEX
* [GETTING STARTED](#getting-started)
* [IMPORTANT](#important)
* [FOLDER STRUCTURE](#folder-structure)
* [STRICT VERSIONING](#strict-versioning)
* [DESIGN SYSTEM](#design-system)
* [GIT STRATEGY](#git-strategy)
* [TECHNOLOGY STACK](#technology-stack)
  * [Build Tools](#build-tools)
  * [Code Quality](#code-quality-)
  * [Javascript](#javascript)
  * [CSS](#css)
  * [HTML](#html)
* [ENVIRONMENTS](#environments)
* [DOCKER DEPLOYMENT](#docker-deployment)

## GETTING STARTED

This project has been set up with [Yarn](https://yarnpkg.com/) as the package manager. It's best practice not to mix
package managers, so please keep using Yarn during the whole project.

Use [NVM (Node Version Manager)](https://github.com/creationix/nvm#install-script) for managing Node on your machine 
with ease. If [configured correctly](https://github.com/creationix/nvm#nvmrc), NVM will pick up the version required for
this project via the .npmrc file.

First download (do **not** clone) the **brain-volumes** folder from the 
[vumc-picture-brain-volumes repository](https://bitbucket.org/activecollectivenl/vumc-picture-brain-volumes/) and place
this folder inside the **src/static/** folder. _The project will not start without these files._

```
# Install (or update or remove) dependencies
$ yarn

# Serve with hot reload at localhost:8000
$ yarn start
```

The component library pages are protected and can only be accessed by adding a '?showComponentLibraryPages' parameter to
the URL. This will set a session cookie which will enable access for the duration of the session without having to add
the parameter again.

## IMPORTANT

Make sure to read all readme's, documentation and comments first. Everything has been thoroughly documented to make it 
easy to understand all the moving parts within this project. This is the minimal required reading list before you get 
started:

* [The Atomic Design System](http://bradfrost.com/blog/post/atomic-web-design/)
* [inuitcss - OOCSS framework](https://github.com/inuitcss/inuitcss)
* [Vue.js - Javacript view library](https://vuejs.org/)
* [Vuex - Javacript state managment](https://vuex.vuejs.org/)
* [Nuxt.js - Javascript framework](https://nuxtjs.org/guide)


## FOLDER STRUCTURE

The folder structure within the **src** directory follows the Nuxt.js directory structure. Please read 
[the documentation about these directories](https://nuxtjs.org/guide/directory-structure) first. Below are important 
folders and files that extend this structure.   

* **config**: Project level configuration
* **runscripts**: Scripts to call with Yarn, these should be available in the _scripts_ property in package.json 
* **src**: All source files needed to build the project
* **src/assets/scripts**: All additional Javascript
* **src/assets/styles**: SCSS categorized via the inuitcss framework methodology
* **src/assets/styles/README.md**: Explains the seperation of SCSS files
* **src/config**: Application level configuration
* **src/data**: Static data
* **.babelrc.js**: Configuration for [Babel](http://babeljs.io/docs/en)
* **.browserslistrc**: The list of supported browsers so different tooling can use the same set of browsers.  
* **.editorconfig**: Configuration for [editorconfig](https://editorconfig.org/), make sure your editor supports this!
* **.eslintrc.js**: Configuration for [ESLint](https://eslint.org/)
* **.npmrc**: Configuration for Yarn
* **.nvmrc**: Configuration for [NVM (Node Version Manager)](https://github.com/creationix/nvm#install-script)
* **.stylelintrc.js**: Configuration for stylelint
* **nuxt.config.js**: Configuration for Nuxt.js
* **webpack.config.webstorm.js**: Configuration for the Webstorm IDE
* **TODO.md**: Any tasks that need attention

The _pages_ folder is used in a different way then the Nuxt.js convention. This folder contains page components which
are manually connected to routes in **src/router.js**. This gives us more flexibility and clarity then using the pages
folder structure as an implicit way to setup routes. The **src/router.js** file explains how routes and pages are
connected. 

## STRICT VERSIONING
This project uses strict versioning for all packages and engines (like Node) in order to ensure the same build on 
different machines and on different moments 
([read more](http://c2fo.io/node/npm/javascript/2016/06/03/protecting-your-product-with-npm-save-exact/)). The 
**.npmrc** file takes care of this no matter how you've configured Yarn (or NPM) locally.


## DESIGN SYSTEM
This project uses a methodology for creating a design system called 
["Atomic Design"](http://atomicdesign.bradfrost.com/table-of-contents/). Please follow it's principles when working on
this project. The system of components can be found in the _src/atomic-component-library_ folder.
   This approach keeps all the atoms as dumb as possible. All the data changes are handled by the container. 

    
## GIT STRATEGY
This project follows the [Git flow](https://nvie.com/posts/a-successful-git-branching-model/) strategy. Also make sure 
every piece of code goes through a 
[pull request (PR) on Bitbucket](https://bitbucket.org/activecollectivenl/vumc-picture-webapp/pull-requests/) as to 
ensure there will always be a second pair of eyes on any new piece of code. 


## TECHNOLOGY STACK

### Build Tools
* [Yarn](https://yarnpkg.com/) as package manager
* [NPM scripts](https://docs.npmjs.com/misc/scripts) for automation 
([further reading](https://medium.freecodecamp.org/introduction-to-npm-scripts-1dbb2ae01633))

### Code Quality 
* [stylelint](https://github.com/stylelint/stylelint) for (S)CSS linting 
([enable in Webstorm](https://www.jetbrains.com/help/webstorm/using-stylelint-code-quality-tool.html))
* [ESLint](https://eslint.org/) for Javascript linting
([enable in Webstorm](https://www.jetbrains.com/help/webstorm/eslint.html))
* [StandardJS](https://standardjs.com/) as JavaScript style guide
* [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) for Vue.js linting
* [lint-staged](https://github.com/okonet/lint-staged) for only linting new and changed files
* [husky](https://github.com/typicode/husky) for Git hooks

### Javascript
* [Nuxt.js](https://nuxtjs.org/guide) as Javascript framework
* [Vuex](https://vuex.vuejs.org/) for state management (which is incorporated in Nuxt.js)
* [brainbrowser](https://brainbrowser.cbrain.mcgill.ca/) for rendering brain volumes

### CSS
* [Node-sass](https://github.com/sass/node-sass) for compiling SCSS to CSS (1)
* [inuitcss](https://github.com/inuitcss/inuitcss) as CSS framework

_(1) node-sass has been upgraded to 4.8.3 but not higher due to an 
[issue](https://github.com/sass/node-sass/issues/2362) that relates to an issue with the sass spec and the deprecation
of including CSS files from SASS.

### HTML
* [Vue.js](https://vuejs.org/) as view library (which is incorporated in Nuxt.js)


## ENVIRONMENTS

* Dev: https://tool.pictureproject.nl/ (if not available, use http://localhost:8000)

## DOCKER DEPLOYMENT
Run ./deploy.local.sh to build and deploy locally (service will be available on http://localhost:8000)
For a server deployment use ./deploy.dev.sh


    
