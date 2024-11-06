# STYLES

All the SCSS files are split up in 2 main folders:

* **src/assets/styles**: This follows the
 [inuitcss framework directory structure](https://github.com/inuitcss/inuitcss#css-directory-structure).
* **src/components/...** The SCSS for components can be found inside the Vue component files.  

The files found in **src/assets/styles/** are seperated into two files that hold al references to these files.

#### src/assets/styles/config.scss 
Holds all references to config files like settings and tools. This file should NOT produce any CSS by itself, but only 
hold all variables that other SCSS files can reference. It's made globally available via the **sassResources** property
in the **nuxt.config.js** file so all components do not have to import this by themselves. This is made possible by the
[nuxt-sass-resources-loader package](https://github.com/anteriovieira/nuxt-sass-resources-loader).

#### src/assets/styles/global.scss
Holds all references to global styling like resets, objects and utilities. This file should only be loaded once before
all other SCSS files, but after the config.scss file. It's imported via the **css** property in the **nuxt.config.js** 
file.
