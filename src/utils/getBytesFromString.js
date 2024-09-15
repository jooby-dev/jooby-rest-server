import {getBytesFromHex, getBytesFromBase64} from 'jooby-codec/utils/index.js';
import {HEX} from 'jooby-codec/constants/bytesConversionFormats.js';


const getBytesFromString = ( bytes, bytesConversionFormats = HEX ) => (
    bytesConversionFormats === HEX
        ? getBytesFromHex(bytes)
        : getBytesFromBase64(bytes)
);

export default getBytesFromString;
