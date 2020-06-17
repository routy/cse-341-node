## Adding a new application
- Create the week's folder in the weeks folder.
- Create the prove and team directories.
- Create the applications within Heroku with the week's prefix:
  
  `heroku create -a w09-team`
  `heroku create -a w09-prove`

- Attach the build pack to the application

  `heroku buildpacks:add -a w09-team https://github.com/heroku/heroku-buildpack-multi-procfile`
  `heroku buildpacks:add -a w09-prove https://github.com/heroku/heroku-buildpack-multi-procfile`

- Set the configuration param to tell the build pack which Procfile to use

  `heroku config:set -a w09-team PROCFILE=weeks/09/team/Procfile`
  `heroku config:set -a w09-prove PROCFILE=weeks/09/prove/Procfile`

- Push to the repositories to build the apps

  `git push https://git.heroku.com/w09-team.git HEAD:master`
  `git push https://git.heroku.com/w09-prove.git HEAD:master`
