## Adding a new application
- Create the week's folder in the weeks folder.  
- Create the prove and team directories.  

|-CSE-341-NODE  
|--weeks  
|---12  
|----prove  
|----team  

- Create the applications within Heroku with the week's prefix (must have a credit card attached to account in order to create more than 5 apps):
  
  `heroku create -a w12-team -r w12-team`  
  `heroku create -a w12-prove -r w12-prove`  

- Attach the build packs to the applications

  `heroku buildpacks:add -a w12-team https://github.com/timanovsky/subdir-heroku-buildpack`  
  `heroku buildpacks:add -a w12-team heroku/nodejs`  
  
  `heroku buildpacks:add -a w12-prove https://github.com/timanovsky/subdir-heroku-buildpack`  
  `heroku buildpacks:add -a w12-prove heroku/nodejs`  

- Set the configuration param to tell the build pack what the project's root path is  
  
  `heroku config:set -a w12-team PROJECT_PATH=weeks/12/team`  
  `heroku config:set -a w12-prove PROJECT_PATH=weeks/12/prove`  
  
- Push to the repositories to build the apps  
  
  `git push w12-team master`  
  `git push w12-prove master`  