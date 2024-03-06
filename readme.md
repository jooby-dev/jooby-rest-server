# Jooby REST Server

It is a JavaScript application that provides a REST API using the [jooby-codec](https://github.com/jooby-dev/jooby-codec) library. This application allows you to easily decode data.


## Table of Contents

- [Jooby REST Server](#jooby-rest-server)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Starting the server](#starting-the-server)
    - [Running with Docker](#running-with-docker)
    - [Environment Variables](#environment-variables)
    - [Routes](#routes)
    - [POST request parameters](#post-request-parameters)
      - [Framing format](#framing-format)
      - [Bytes conversion format](#bytes-conversion-format)
      - [Direction](#direction)
      - [Protocols](#protocols)
      - [Dlms conversion](#dlms-conversion)
    - [Examples](#examples)
      - [Decoder](#decoder)
        - [Analog module](#analog-module)
        - [Mtx](#mtx)
        - [MtxLora](#mtxlora)
        - [MtxLora (dlms)](#mtxlora-dlms)
        - [Obis observer](#obis-observer)
      - [Encoder](#encoder)
        - [Analog module](#analog-module-1)
        - [Mtx](#mtx-1)
        - [MtxLora](#mtxlora-1)
        - [Obis observer](#obis-observer-1)


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

### Routes

| Method | Path                     | description                                                                         |
| ------ | ------------------------ | ----------------------------------------------------------------------------------- |
| POST   | /v1/decoder              | General decoder route. Need to specify [protocol](#protocols) in the requests body  |
| POST   | /v1/decoder/analog       | Decoder for the `analog` protocol based devices                                     |
| POST   | /v1/decoder/mtx          | Decoder for the `mtx` protocol based devices                                        |
| POST   | /v1/decoder/mtxLora      | Decoder for the `mtxLora` protocol based devices                                    |
| POST   | /v1/decoder/obisObserver | Decoder for the `obisObserver` protocol based devices                               |
| POST   | /v1/encoder              | General encoder route. Need to specify [protocol](#protocols)  in the requests body |
| POST   | /v1/encoder/analog       | Encoder for the `analog` protocol based devices                                     |
| POST   | /v1/encoder/mtx          | Encoder for the `mtx` protocol based devices                                        |
| POST   | /v1/encoder/mtxLora      | Encoder for the `mtxLora` protocol based devices                                    |
| POST   | /v1/encoder/obisObserver | Encoder for the `obisObserver` protocol based devices                               |


### POST request parameters

#### Framing format

| name | value | description       |
| ---- | ----- | ----------------- |
| NONE | `0`   | no framing        |
| HDLC | `1`   | HDLC frame format |

Default value: `0`
Example: `framingFormat: 1`

#### Bytes conversion format

| name   | value | description                   |
| ------ | ----- | ----------------------------- |
| HEX    | `1`   | data treats as hex string     |
| BASE64 | `2`   | data threats as base64 string |


Default value: `1`
Example: `bytesConversionFormat: 1`

#### Direction

| name     | value | description                                               |
| -------- | ----- | --------------------------------------------------------- |
| AUTO     | `0`   | auto detection                                            |
| DOWNLINK | `1`   | the path of data transmission from the device to the user |
| UPLINK   | `2`   | the path of data transmission from the user to the device |

Note: direction is not utilized for the obisObserver based devices.
Default value: `0`
Example: `direction: 1`


#### Protocols

| Value        | description                           |
| ------------ | ------------------------------------- |
| analog       | `analog` protocol based devices       |
| mtx          | `mtx` protocol based devices          |
| mtxLora      | `mtxLora` protocol based devices      |
| obisObserver | `obisObserver` protocol based devices |

Example: `protocol: obisObserver`

#### Dlms conversion

Valid for the `mtxLora` based devices. OBIS codes used as fields in decoder reports.

Example: `dlms: true`


### Examples

#### Decoder

##### Analog module

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": 1, "bytesConversionFormat": 1,"data": "1f020048"}' \
    http://localhost:3000/v1/decoder/analog
```

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "protocol": "analog", "direction": 1, "bytesConversionFormat": 1,"data": "1f020048"}' \
    http://localhost:3000/v1/decoder
```

##### Mtx

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": 1, "bytesConversionFormat": 2,"data": "ARAQBwAAQg=="}' \
    http://localhost:3000/v1/decoder/mtx
```

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "protocol": "mtx", "direction": 1, "bytesConversionFormat": 2,"data": "ARAQBwAAQg=="}' \
    http://localhost:3000/v1/decoder
```

##### MtxLora

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": 1, "bytesConversionFormat": 2, "data": "HgkjkSMQEAcAAADU"}' \
    http://localhost:3000/v1/decoder/mtxLora
```

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "protocol": "mtxLora", "direction": 1, "bytesConversionFormat": 2, "data": "HgkjkSMQEAcAAADU"}' \
    http://localhost:3000/v1/decoder
```

##### MtxLora (dlms)

Segment 1:
```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": 2, "dlms": "true", "data": "1e28c4314d1010796430280fff011d00000008001a00000008001d00000008011d00000008001a00000033"}' \
    http://localhost:3000/v1/decoder/mtxLora
```

Segment 2:
```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": 2, "dlms": "true", "data": "1e28c43208001d00000008011d00000008001a00000008001d00000008011d00000008001a00000008009d"}' \
    http://localhost:3000/v1/decoder/mtxLora
```

Segment 3:
```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": 2, "dlms": "true", "data": "1e21c4b31d00000008013a00000008013a00000008013a00000008013a00000008000063d0b9e5e7"}' \
    http://localhost:3000/v1/decoder/mtxLora
```

##### Obis observer

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "data": "04050108080001"}' \
    http://localhost:3000/v1/decoder/obisObserver
```

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "protocol": "obisObserver", "data": "04050108080001"}' \
    http://localhost:3000/v1/decoder
```

#### Encoder

##### Analog module

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": 1, "commands": [{"id": 7}]}' \
    http://localhost:3000/v1/encoder/analog
```

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "protocol": "analog", "direction": 1, "commands": [{"id": 7}]}' \
    http://localhost:3000/v1/encoder
```

##### Mtx

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": 1, "messageId": 2, "commands": [{"id": 7}]}' \
    http://localhost:3000/v1/encoder/mtx
```

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "protocol": "mtx", "direction": 1, "messageId": 2, "commands": [{"id": 7}]}' \
    http://localhost:3000/v1/encoder
```

##### MtxLora

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "direction": 1, "messageId": 2, "segmentationSessionId": 2, "commands":[{"id":7}]}' \
    http://localhost:3000/v1/encoder/mtxLora
```

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "protocol": "mtxLora", "direction": 1, "messageId": 2, "segmentationSessionId": 2, "commands":[{"id":7}]}' \
    http://localhost:3000/v1/encoder
```

##### Obis observer

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "commands":[{"requestId": 2, "id":5}]}' \
    http://localhost:3000/v1/encoder/obisObserver
```

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"deviceEUI": "001a79881701b63c", "protocol": "obisObserver", "commands":[{"requestId": 2, "id":5}]}' \
    http://localhost:3000/v1/encoder/obisObserver
```
