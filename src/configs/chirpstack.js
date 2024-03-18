const {env} = process;

export default {
    apiUrl: env.CHIRPSTACK_REST_API_URL,
    apiKey: env.CHIRPSTACK_API_KEY
};
