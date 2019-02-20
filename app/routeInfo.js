const os = require('os');

module.exports = {
    async handler(req, rep) {
        rep.code(200)
            .send({
                statusCode: 200,
                data: {
                    arch: os.arch(),
                    endianness: os.endianness(),
                    freemem: os.freemem(),
                    homedir: os.homedir(),
                    hostname: os.hostname(),
                    loadavg: os.loadavg(),
                    platform: os.platform(),
                    tmpdir: os.tmpdir(),
                    totalmem: os.totalmem(),
                    type: os.type(),
                    uptime: os.uptime(),
                    userInfo: os.userInfo()
                }
            });
    }
};