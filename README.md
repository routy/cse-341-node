## Adding a new application
- Create the week's folder in the weeks folder.  
- Create the prove and team directories.  

|-CSE-341-NODE  
|--weeks  
|---10  
|----prove  
|----team  

- Create the applications within Heroku with the week's prefix (must have a credit card attached to account in order to create more than 5 apps):
  
  `heroku create -a w10-team -r w10-team`  
  `heroku create -a w10-prove -r w10-prove`  

- Attach the build packs to the applications

  `heroku buildpacks:add -a w10-team https://github.com/timanovsky/subdir-heroku-buildpack`  
  `heroku buildpacks:add -a w10-team heroku/nodejs`  
  
  `heroku buildpacks:add -a w10-prove https://github.com/timanovsky/subdir-heroku-buildpack`  
  `heroku buildpacks:add -a w10-prove heroku/nodejs`  

- Set the configuration param to tell the build pack what the project's root path is  
  
  `heroku config:set -a w10-team PROJECT_PATH=weeks/10/team`  
  `heroku config:set -a w10-prove PROJECT_PATH=weeks/10/prove`  
  
- Push to the repositories to build the apps  
  
  `git push w10-team master`  
  `git push w10-prove master`  
