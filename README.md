## Adding a new application
- Create the week's folder in the weeks folder.  
- Create the prove and team directories.  

|-CSE-341-NODE  
|--weeks  
|---11  
|----prove  
|----team  

- Create the applications within Heroku with the week's prefix (must have a credit card attached to account in order to create more than 5 apps):
  
  `heroku create -a w11-team -r w11-team`  
  `heroku create -a w11-prove -r w11-prove`  

- Attach the build packs to the applications

  `heroku buildpacks:add -a w11-team https://github.com/timanovsky/subdir-heroku-buildpack`  
  `heroku buildpacks:add -a w11-team heroku/nodejs`  
  
  `heroku buildpacks:add -a w11-prove https://github.com/timanovsky/subdir-heroku-buildpack`  
  `heroku buildpacks:add -a w11-prove heroku/nodejs`  

- Set the configuration param to tell the build pack what the project's root path is  
  
  `heroku config:set -a w11-team PROJECT_PATH=weeks/11/team`  
  `heroku config:set -a w11-prove PROJECT_PATH=weeks/11/prove`  
  
- Push to the repositories to build the apps  
  
  `git push w11-team master`  
  `git push w11-prove master`  