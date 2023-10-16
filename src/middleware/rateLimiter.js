const {rateLimit} = require('express-rate-limit')

const limiter = rateLimit({
windowsMs: 60 * 1000,
max: 2,
message: "Request limit exceeded. Please try again later.",
validate: {trustProxy: false} 
})

module.exports = limiter