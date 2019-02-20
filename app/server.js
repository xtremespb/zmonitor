const fastify = require('fastify')({
    logger: true
});
const routeProcesses = require('./routeProcesses');
const routeInfo = require('./routeInfo');
const routeProcess = require('./routeProcess');

const config = require('./../etc/config.json');

/**
 * @api {get} /process/list Get list of all running processes
 * @apiGroup Process
 *
 * @apiDescription The method is used to get a list of all running processes
 *
 * @apiExample Example usage:
 * curl -i http://127.0.0.1:3000/process/list
 *
 * @apiSuccess {Number}   statusCode        Response status code, "200" means "OK"
 * @apiSuccess {Object[]} data              A list of processes
 * @apiSuccess {String}   data.name         Process name
 * @apiSuccess {Number}   data.pid          PID
 * @apiSuccess {Number}   data.ppid         PPID
 *
 * @apiError {Number}     statusCode    Error status code
 * @apiError {String}     error         Error title
 * @apiError {String}     message       Error description
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400,
 *       "error":"Bad Request",
 *       "message":"Something bad is happening"
 *     }
 */
fastify.get('/process/list', routeProcesses);
/**
 * @api {get} /system Get system information
 * @apiGroup System
 *
 * @apiDescription The method is used to get system information including CPU load, memory usage etc.
 *
 * @apiExample Example usage:
 * curl -i http://127.0.0.1:3000/system
 *
 * @apiSuccess {Number}   statusCode        Response status code, "200" means "OK"
 * @apiSuccess {Object}   data
 * @apiSuccess {String}   data.arch         A string identifying the operating system CPU architecture for which the Node.js binary was compiled
 * @apiSuccess {String}   data.endianness   A string identifying the endianness of the CPU for which the Node.js binary was compiled
 * @apiSuccess {Number}   data.freemem      The amount of free system memory in bytes
 * @apiSuccess {String}   homedir           The home directory of the current user
 * @apiSuccess {String}   hostname          The hostname of the operating system
 * @apiSuccess {Array}   loadavg           An array containing the 1, 5, and 15 minute load averages
 * @apiSuccess {String}   platform          A string identifying the operating system platform as set during compile time of Node.js
 * @apiSuccess {String}   tmpdir            A string specifying the operating system's default directory for temporary files
 * @apiSuccess {String}   totalmem          The total amount of system memory in bytes as an integer
 * @apiSuccess {String}   type              A string identifying the operating system name as returned by uname(3). For example, 'Linux' on Linux, 'Darwin' on macOS, and 'Windows_NT' on Windows
 * @apiSuccess {Number}   uptime            The system uptime in number of seconds
 * @apiSuccess {Object}   userInfo          Returns information about the currently effective user — on POSIX platforms, this is typically a subset of the password file. The returned object includes the username, uid, gid, shell, and homedir. On Windows, the uid and gid fields are -1, and shell is null
 *
 * @apiError {Number}     statusCode    Error status code
 * @apiError {String}     error         Error title
 * @apiError {String}     message       Error description
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400,
 *       "error":"Bad Request",
 *       "message":"Something bad is happening"
 *     }
 */
fastify.get('/system', routeInfo);
/**
 * @api {get} /process/info Get information about the specified PID
 * @apiGroup Process
 *
 * @apiDescription The method is used to get information on the specified PID
 *
 * @apiParam {Number} pid The PID of the requested process
 *
 * @apiExample Example usage:
 * curl -i http://127.0.0.1:3000/process/info?pid=12345
 *
 * @apiSuccess {Number}   statusCode        Response status code, "200" means "OK"
 * @apiSuccess {Object}   data              A list of processes
 * @apiSuccess {String}   data.name         Process name
 * @apiSuccess {Number}   data.pid          PID
 * @apiSuccess {Number}   data.ppid         PPID
 *
 * @apiError {Number}     statusCode    Error status code
 * @apiError {String}     error         Error title
 * @apiError {String}     message       Error description
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": 400,
 *       "error":"Bad Request",
 *       "message":"Something bad is happening"
 *     }
 */
fastify.get('/process/info', routeProcess);

// Static source

fastify.register(require('fastify-static'), {
    root: `${__dirname}/../html`
});

((async function start() {
    try {
        await fastify.listen(config.port, config.ip);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})());