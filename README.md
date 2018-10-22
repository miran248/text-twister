# text-twister
A simple Text Twist clone with currently limited gameplay.

- frontend ([managed by travis](https://travis-ci.org/miran248/text-twister/)) runs on [github pages](https://miran248.github.io/text-twister/)
- backend (containerized) is currently not running (needs a host)

## Why?
- haven't used redux for over a year
- wanted to try travis and docker in a monorepo setup
- wanted to try protobuf
- .. fun?

## Setup

```
# install dependencies
yarn

# set mongo env vars (used by docker-compose)
echo -e "MONGO_USERNAME=mongo\nMONGO_PASSWORD=123123\nMONGO_DATABASE=tt" > .env
```

### Environment
- docker 18.06.0-ce
- node 10.12.0
- yarn 1.10.1

Tools are required, versions aren't

## Run

```
# frontend
cd client && yarn start

# backend
docker-compose up
```

### Screenshots

![landing](https://user-images.githubusercontent.com/32389245/47268408-e4f28880-d550-11e8-80be-d94ce6420509.png)
![gameplay 1](https://user-images.githubusercontent.com/32389245/47268573-fb99df00-d552-11e8-888a-e872a810ee61.png)
![gameplay 2](https://user-images.githubusercontent.com/32389245/47268585-13716300-d553-11e8-9c8a-ab680ec7d186.png)

## License
text-twister is licensed under the [MIT license.](https://github.com/miran248/text-twister/blob/master/LICENSE)
