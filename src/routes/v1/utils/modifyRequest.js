import {utils} from '@jooby-dev/jooby-codec/index.js';


const modifyRequestBody = body => {
    const {
        accessLevel,
        aesKey,
        data,
        deviceEUI,
        direction,
        hardwareType,
        framingFormat,
        frame,
        bytesConversionFormat,
        messageId,
        segmentationSessionId,
        maxSegmentSize
    } = body;

    let aesKeyBytes;

    if ( aesKey ) {
        aesKeyBytes = utils.getBytesFromString(aesKey, bytesConversionFormat);
    }

    const response = {
        deviceEUI,
        direction,
        hardwareType,
        bytesConversionFormat,
        accessLevel,
        framingFormat,
        messageId,
        segmentationSessionId,
        maxSegmentSize,
        data
    };

    if ( frame ) {
        const {type, destination, source} = frame;

        response.frame = {type, destination, source};

        if ( frame.messageId ) {
            response.frame.messageId = frame.messageId;
        }
    }

    return {
        ...body,
        aesKeyBytes,
        response
    };
};


export const modifyDecoderRequest = ( request, reply, done ) => {
    const body = modifyRequestBody(request.body);
    const {data, bytesConversionFormat} = request.body;

    body.bytes = utils.getBytesFromString(data, bytesConversionFormat);
    request.body = body;

    done();
};

export const modifyEncoderRequest = ( request, reply, done ) => {
    request.body = modifyRequestBody(request.body);

    done();
};
