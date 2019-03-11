# Express & mongoose REST API

## Task Overview

We want you to create a simple NodeJS backend, that will use MongoDB and Facebook Marketing API.

Two REST API nodes need to be implemented:

- /create will create a Facebook Ad Campaign while taking the campaign name and type (objective) as query parameters. The created campaign ID needs to be stored in a database.
- /delete will remove all the created Facebook Ad Campaigns based on database data

Code requirements:
- Code needs to in ES6 standard
- Code needs to be linted via ESLint and beautified via Prettier
- Code needs to use async/await where applicable

We’ll provide access to a Facebook Business Account & Ad Account

We’d like the code to be buildable and runable when develivered with information how to setup the database for our reviewing developer.

We’ll evaluate code structure, quality, cleaness and how fast the task is completed.

### Usage

Use any development tool to make API request. Postman, for example.

POST http://localhost:4040/api/create
All keys is required
```
body {
  "campaignName": <String>,
  "campaignStatus" : <String: https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/>,
  "campaignObjective": <String: https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/>
}
```

DELETE http://localhost:4040/api/delete
```
Deleting all records in db and Facebook
```

## Getting Started

Clone the repo:
```sh
git clone https://github.com/surzhik/nem-rest-api.git
cd nem-rest-api
```
Install dependencies:
```sh
yarn install
```
Create Empty MongoDB database

Set environment (vars):
```
Set keys in .env
MONGO_HOST - path to your mongodb
MONGO_PORT - mongodb database port 
FB_APP_ID - Facebook app id / Can be found in URL https://business.facebook.com/adsmanager/creation ?act=1508716782592268
FB_APP_ACCESS_TOKEN= - Facebook access token https://developers.facebook.com/tools/explorer

```

Start server:
```sh
# Start server
yarn start

# Selectively set DEBUG env var to get logs
DEBUG=express-mongoose-es6-rest-api:* yarn start
```
Refer [debug](https://www.npmjs.com/package/debug) to know how to selectively turn on logs.


Tests:
```sh
# Run tests written in ES6 
yarn test

# Run test along with code coverage
yarn test:coverage

# Run tests on file change
yarn test:watch

# Run tests enforcing code coverage (configured via .istanbul.yml)
yarn test:check-coverage
```

Lint:
```sh
# Lint code with ESLint
yarn lint

# Run lint on any file change
yarn lint:watch
```

Other gulp tasks:
```sh
# Wipe out dist and coverage directory
gulp clean

# Default task: Wipes out dist and coverage directory. Compiles using babel.
gulp
```

##### Deployment

```sh
# compile to ES5
1. yarn build

# upload dist/ to your server
2. scp -rp dist/ user@dest:/path

# install production dependencies only
3. yarn --production

# Use any process manager to start your services
4. pm2 start dist/index.js
```

In production you need to make sure your server is always up so you should ideally use any of the process manager recommended [here](http://expressjs.com/en/advanced/pm.html).
We recommend [pm2](http://pm2.keymetrics.io/) as it has several useful features like it can be configured to auto-start your services if system is rebooted.

## Logging

Universal logging library [winston](https://www.npmjs.com/package/winston) is used for logging. It has support for multiple transports.  A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file. We just log to the console for simplicity, you can configure more transports as per your requirement.

#### API logging
Logs detailed info about each api request to console during development.
![Detailed API logging](https://cloud.githubusercontent.com/assets/4172932/12563354/f0a4b558-c3cf-11e5-9d8c-66f7ca323eac.JPG)

#### Error logging
Logs stacktrace of error to console along with other details. You should ideally store all error messages persistently.
![Error logging](https://cloud.githubusercontent.com/assets/4172932/12563361/fb9ef108-c3cf-11e5-9a58-3c5c4936ae3e.JPG)

## Code Coverage
Get code coverage summary on executing `yarn test`
![Code Coverage Text Summary](https://cloud.githubusercontent.com/assets/4172932/12827832/a0531e70-cba7-11e5-9b7c-9e7f833d8f9f.JPG)

`yarn test` also generates HTML code coverage report in `coverage/` directory. Open `lcov-report/index.html` to view it.
![Code coverage HTML report](https://cloud.githubusercontent.com/assets/4172932/12625331/571a48fe-c559-11e5-8aa0-f9aacfb8c1cb.jpg)

## Docker

#### Using Docker Compose for Development
```sh
# service restarts on file change
bash bin/development.sh
```

#### Building and running without Docker Compose
```bash
# To use this option you need to make sure mongodb is listening on port 27017

# Build docker 
docker build -t express-mongoose-es6-rest-api .

# Run docker
docker run -p 4040:4040 express-mongoose-es6-rest-api
```


## A Boilerplate-only Option

If you would prefer not to use any of our tooling, delete the following files from the project: `package.json`, `gulpfile.babel.js`, `.eslintrc` and `.travis.yml`. You can now safely use the boilerplate with an alternative build-system or no build-system at all if you choose.

## Docs and Recipes

* [Gulp recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - the official Gulp recipes directory includes a comprehensive list of guides for different workflows you can add to your project.

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions submit a pull request with unit test.

## License
This project is licensed under the [MIT License](https://github.com/kunalkapadia/express-mongoose-es6-rest-api/blob/master/LICENSE)



