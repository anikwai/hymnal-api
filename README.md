# trinity-hymnal-api #
> Serves the trinity hymnal through an API.

## API ##
> http://www.hymnal-api.kingnebby.com/hymn

### Basic Usage ###

Supports any query params as attribute queries.
```bash
http://www.hymnal-api.kingnebby.com/hymn?hymn_number=100
http://www.hymnal-api.kingnebby.com/hymn?title=it%20is%20well
```

Valid attributes are `hymn_number`, `title`, `author`, `first_line`, and `lyrics`.
All parameters, even additional ones, are put together in an or query.


### Additional Query Params ###
`expanded=true` All query parameters values are applied to searching the lyrics field as independent keywords.
```bash
http://www.hymnal-api.kingnebby.com/hymn?title=nor%20fear&expanded=true
```

`phrase` The value of the phrase param is used to search for that sequence of words on the lyrics field.
```bash
http://www.hymnal-api.kingnebby.com/hymn?phrase=began%20the%20life%20divine
```

## Contribute ##

### First Time Setup ###

```javascript
npm install
```

*MongoDB*
You will need an instance of mongo db to test against. [mlab](www.mlab.com) is a good place to start.

*[config]*(https://github.com/lorenwest/node-config)
Ensure you have a development config setup.
- Copy `config/default.json5` to `config/development.json5` and specify your application details.
- Set `NODE_ENV=development` to pick up your config file.

*[dotenv]*(https://github.com/motdotla/dotenv)
Ensure you setup your db/server information. 
- Copy the sample file `.env.example` to `.env` and tailor to your environment.

*Data Load*
```javascript
node tasks/buildDb.js
```

*Run!!*
```javascript
npm run nodemon
```

## Project ##
[Trello](https://trello.com/b/qqGViEvF/trinity-hymnal-mobile) is used for task tracking.

Author danielavilla02@gmail.com