const config = {
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || "ChAmath$$Rath^nayake",
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://chamath95:hhYVaaLSkaUIUuyu@expencestracker.ebzdwmy.mongodb.net/?retryWrites=true&w=majority"
}


module.exports = {
    config
}