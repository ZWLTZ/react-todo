var path = require('path')

module.exports = {
    build: {
        outRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
    },
    dev: {
        port: 3200,
    }
}