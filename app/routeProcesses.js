const ps = require('../lib/ps');

module.exports = {
    async handler(req, rep) {
        let processList;
        try {
            processList = await ps();
        } catch (e) {
            rep.code(500);
        }
        rep.code(200)
            .send({
                statusCode: 200,
                data: processList
            });
    }
};