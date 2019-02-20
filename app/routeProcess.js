const ps = require('../lib/ps');

module.exports = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                pid: {
                    type: 'integer'
                }
            },
            required: ['pid']
        }
    },
    attachValidation: true,
    async handler(req, rep) {
        if (req.validationError) {
            return rep.code(400).send(req.validationError);
        }
        let processList;
        try {
            processList = await ps();
        } catch (e) {
            rep.code(500);
        }
        processList = processList.filter(item => item.pid === req.query.pid);
        if (!processList.length) {
            return rep.code(400)
                .send({
                    statusCode: 400,
                    error: 'Could not find requested process by PID'
                });
        }
        return rep.code(200)
            .send({
                statusCode: 200,
                data: processList[0]
            });
    }
};