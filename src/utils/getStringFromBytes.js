import {getHexFromBytes, getBase64FromBytes} from 'jooby-codec/utils/index.js';
import {BASE64} from 'jooby-codec/constants/bytesConversionFormats.js';


const getStringFromBytes = ( bytes, {bytesConversionFormat} = {} ) => (
    bytesConversionFormat === BASE64
        ? getBase64FromBytes(bytes)
        : getHexFromBytes(bytes)
);

export default getStringFromBytes;
