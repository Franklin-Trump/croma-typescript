
const { createClient } = require('redis');
const redis = createClient({
    url: 'redis://default:hoang123@redis-15761.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:15761'
});

(async function setup() {
    try {
        redis.on("error", (err) => console.log("Redis Client Error", err));
        await redis.connect();
    } catch (error) {
        console.log(error)
    }
})();

module.exports = redis;