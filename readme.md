# Jooby REST Server

`jooby-rest-server` is a JavaScript application that provides a REST API using the [jooby-codec](https://github.com/jooby-dev/jooby-codec) library. This application allows you to easily decode data.

## Table of Contents

- [Jooby REST Server](#jooby-rest-server)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Starting the server](#starting-the-server)
    - [Running with Docker](#running-with-docker)
    - [Environment Variables](#environment-variables)
    - [Examples](#examples)
      - [Decode](#decode)
        - [Obis observer](#obis-observer)
        - [Analog module](#analog-module)
        - [Mtx lora](#mtx-lora)

## Installation
Make sure you have Node.js and npm installed on your machine. You can install `jooby-rest-server` using the following steps:

```bash
npm install -g jooby-rest-server
```

## Usage

###  Starting the server

```bash
npm run start
```

### Running with Docker

```bash
docker run \
  --restart unless-stopped \
  --network host \
  --name jooby-rest-server \
  joobydev/jooby-rest-server
```

### Environment Variables

List of available environment variables.

 | name                       | default value   | description                                                                                               |
 | -------------------------- | --------------- | --------------------------------------------------------------------------------------------------------- |
 | NODE_ENV                   |                 | node environment setup                                                                                    |
 | LOG_LEVEL                  | info            | [pino log levels](https://github.com/pinojs/pino/blob/master/docs/api.md#loggerlevel-string-gettersetter) |
 | HTTP_HOST                  | `0.0.0.0`       |                                                                                                           |
 | HTTP_PORT                  | `3000`          |                                                                                                           |


### Examples

#### Decode

##### Obis observer

```bash
curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "data": "BAUBCAgAAQ=="}' http://localhost:3000/v1/obis-observer/decoder
```

##### Analog module

```bash
curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "direction": "uplink", "data": "HwICAAtB"}' http://localhost:3000/v1/analog/decoder
```

##### Mtx lora

```bash
curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "direction": "downlink", "data": "HgkjkSMQEAcAAADU"}' http://localhost:3000/v1/mtx-lora/decoder
```
