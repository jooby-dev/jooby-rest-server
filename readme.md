# Jooby REST Server

It is a JavaScript application that provides a REST API using the [jooby-codec](https://github.com/jooby-dev/jooby-codec) library. This application allows you to easily decode data.


## Table of Contents

- [Jooby REST Server](#jooby-rest-server)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Starting the server](#starting-the-server)
    - [Running with Docker](#running-with-docker)
    - [Environment Variables](#environment-variables)
    - [Examples](#examples)
      - [Decode](#decode)
        - [Obis observer](#obis-observer)
        - [Analog module](#analog-module)
        - [Mtx lora](#mtx-lora)


## Usage

###  Starting the server

```bash
git clone https://github.com/jooby-dev/jooby-rest-server.git
cd jooby-rest-server
npm ci
npm start
```

### Running with Docker

You can also run `jooby-rest-server` using Docker. Ensure you have Docker installed on your machine, and then use the following command:

```bash
docker pull joobydev/jooby-rest-server

docker run \
    --restart unless-stopped \
    --network host \
    --name jooby-rest-server \
    joobydev/jooby-rest-server
```

### Environment Variables

Available environment variables:

| name      | default value | description                                                                                               |
| --------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| NODE_ENV  |               | node environment setup                                                                                    |
| LOG_LEVEL | info          | [pino log levels](https://github.com/pinojs/pino/blob/master/docs/api.md#loggerlevel-string-gettersetter) |
| HTTP_HOST | `0.0.0.0`     |                                                                                                           |
| HTTP_PORT | `3000`        |                                                                                                           |

### Examples

#### Decode

##### Obis observer

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "data": "BAUBCAgAAQ=="}' \
    http://localhost:3000/v1/obis-observer/decoder
```

##### Analog module

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": "uplink", "data": "HwICAAtB"}' \
    http://localhost:3000/v1/analog/decoder
```

##### Mtx lora

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": "downlink", "data": "HgkjkSMQEAcAAADU"}'
    http://localhost:3000/v1/mtx-lora/decoder
```
