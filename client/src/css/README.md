# This file describes the stylesheet hierarchy for this project:

Inspiration taken from "[How to structure a Sass project](http://thesassway.com/beginner/how-to-structure-a-sass-project)."

## Stylesheet Hierarchy

- The css/sass stylesheet will be broken into the following hierarchy:

```
css (stylesheets)/  
|  
`-- App.scss               # Import location for all partials 
    |  
    |-- modules/               # Common modules  
    |   |-- _all.scss            # Include to get all modules  
    |   |-- _utility.scss        # Utility sass variables 
    |   |-- _colors.scss         # Color palette for the project
    |   ...  
    |  
    |-- partials/              # Partials  
    |   |-- _base.sass           # imports for all mixins + global project variables  
    |   |-- _animation.scss      # animations 
    |   |-- home/                # styling files used to create the website's Home page  
    |   |-- naviagtion/          # styling files used for various navigation components  
    |   |-- nominees/            # styling files used to create the website's Nominees page  
    |   |-- notification/        # styling files used for various notification components
    |   |-- vote/                # styling files used to create the website's Vote page  
    |   ...  
    |  
    `-- vendor/             # CSS or Sass from other projects  
         |-- _colorpicker-1.1.scss  
         |-- _jquery.ui.core-1.9.1.scss  
         ...  
```

- The modules directory is reserved for Sass code that doesn't cause Sass to actually output CSS. Things like mixin declarations, functions, and variables.

- The partials directory is where the meat of my CSS is constructed. This may be breaking the stylesheets into header, content, sidebar, footer components, etc. or it could be broken into much finer categories (typography, buttons, textboxes, selectboxes, etc.).

- The vendor directory is for third-party CSS. This is handy when using prepackaged components developed by other people (or for your own components that are maintained in another project). jQuery UI and a color picker are examples of CSS that you might want to place in the vendor directory. As a general rule don't modify files in the vendor directory. If modifications are needed, add those after the vendored files are included in the primary stylesheet. This should make it easier to update third-party stylesheets to more current versions in the future.
