# About this Repository

This repository contains pages of an frontend prototype.

## Docker

### Angular via Node.js 
```bash
$ docker run -d -v "$PWD":/usr/src/app -w /usr/src/app -p 3000:3000 node:5 ./docker-entrypoint.sh
```

### Mock rest api
```bash
$ docker run -d -v "$PWD":/usr/src/app -w /usr/src/app -p 3001:8000 node:5 ./mock-entrypoint.sh
```
