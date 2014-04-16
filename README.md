ember-jobs
==========


this is using ember-cli master (for now)

```sh
git clone git://github.com/stefanpenner/ember-cli.git
cd ember-cli && npm link

// then install the app

git clone git@github.com:stefanpenner/ember-jobs.git
cd ember-jobs
npm link ember-cli
bower install
npm install
./node_modules/.bin/ember  server

```
