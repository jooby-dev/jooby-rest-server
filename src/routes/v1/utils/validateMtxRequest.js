import {validateEncoderRequest, validateDecoderRequest} from './validateRequest.js';
import {validateMtxAesDecoderParameters, validateMtxAesEncoderParameters} from './validateMtxAesParameters.js';
import {mtx} from 'jooby-codec/index.js';
import errors from '../../../errors.js';
import {HDLC} from '../../../constants/framingFormats.js';


const {frameTypes} = mtx.constants;
const mtxFrameTypesSet = new Set(Object.values(frameTypes));


export const validateMtxDecoderRequest = ( request, reply ) => (
    validateDecoderRequest(request, reply) || !validateMtxAesDecoderParameters(request, reply)
);


export const validateMtxEncoderRequest = ( request, reply ) => {
    const {body} = request;
    const {
        framingFormat,
        frame
    } = body;

    if ( !validateEncoderRequest(request, reply) || !validateMtxAesEncoderParameters(request, reply) ) {
        return false;
    }

    if ( framingFormat === HDLC ) {
        if ( frame?.type && !mtxFrameTypesSet.has(frame.type) ) {
            reply.sendError(errors.BAD_REQUEST, `Wrong frame header. Type: ${frame.type}`);

            return false;
        }
    }

    const {messageId} = framingFormat === HDLC ? frame : body;

    if ( !messageId ) {
        reply.sendError(errors.BAD_REQUEST, 'Message id not found');

        return false;
    }

    return true;
};
