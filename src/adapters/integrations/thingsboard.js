/**
 * Convert default response to Thingsboard format.
 * `deviceName` is required as unique id for device for integration.
 */
export default data => ({
    data,
    deviceName: data.deviceEUI
});
