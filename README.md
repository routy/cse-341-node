## Adding a new application
- Create the week's folder in the weeks folder.  
- Create the prove and team directories.  

|-CSE-341-NODE  
|--weeks  
|---09  
|----prove  
|----team  

- Create the applications within Heroku with the week's prefix (must have a credit card attached to account in order to create more than 5 apps):
  
  `heroku create -a [$ENTER_YOUR_PREFIX_HERE]w09-team -r [$ENTER_YOUR_PREFIX_HERE]w09-team`  
  `heroku create -a [$ENTER_YOUR_PREFIX_HERE]w09-prove -r [$ENTER_YOUR_PREFIX_HERE]w09-prove`  

- Attach the build packs to the applications

  `heroku buildpacks:add -a [$ENTER_YOUR_PREFIX_HERE]w09-team https://github.com/timanovsky/subdir-heroku-buildpack`  
  `heroku buildpacks:add -a [$ENTER_YOUR_PREFIX_HERE]w09-team heroku/nodejs`  
  
  `heroku buildpacks:add -a [$ENTER_YOUR_PREFIX_HERE]w09-prove https://github.com/timanovsky/subdir-heroku-buildpack`  
  `heroku buildpacks:add -a [$ENTER_YOUR_PREFIX_HERE]w09-prove heroku/nodejs`  

- Set the configuration param to tell the build pack what the project's root path is  
  
  `heroku config:set -a [$ENTER_YOUR_PREFIX_HERE]w09-team PROJECT_PATH=weeks/09/team`  
  `heroku config:set -a [$ENTER_YOUR_PREFIX_HERE]w09-prove PROJECT_PATH=weeks/09/prove`  
  
- Push to the repositories to build the apps  
  
  `git push [$ENTER_YOUR_PREFIX_HERE]w09-team master`  
  `git push [$ENTER_YOUR_PREFIX_HERE]w09-prove master`  
