const util = require('util');
const path = require('path');
const childProcess = require('child_process');

const execFile = util.promisify(childProcess.execFile);

const windows = async () => {
    const fastlist = `${__dirname}/../bin/fastlist.exe`;
    const { stdout } = await execFile(fastlist, {
        maxBuffer: 1000 * 1000 * 10
    });
    return stdout
        .trim()
        .split('\r\n')
        .map(line => line.split('\t'))
        .map(([name, pid, ppid]) => ({
            name,
            pid: Number.parseInt(pid, 10),
            ppid: Number.parseInt(ppid, 10)
        }));
};

const unix = async (options = {}) => {
    const flags = `${(options.all === false ? '' : 'a')}wwxo`;
    const ret = {};
    await Promise.all(['comm', 'args', 'ppid', 'uid', '%cpu', '%mem'].map(async cmd => {
        const { stdout } = await execFile('ps', [flags, `pid,${cmd}`], {
            maxBuffer: 1000 * 1000 * 10
        });
        stdout.trim().split('\n').slice(1).map(stdoutLine => {
            const line = stdoutLine.trim();
            const [pid] = line.split(' ', 1);
            const val = line.slice(pid.length + 1).trim();
            if (ret[pid] === undefined) {
                ret[pid] = {};
            }
            ret[pid][cmd] = val;
        });
    }));
    return Object.entries(ret)
        .filter(([, value]) => value.comm && value.args && value.ppid && value.uid && value['%cpu'] && value['%mem'])
        .map(([key, value]) => ({
            pid: Number.parseInt(key, 10),
            name: path.basename(value.comm),
            cmd: value.args,
            ppid: Number.parseInt(value.ppid, 10),
            uid: Number.parseInt(value.uid, 10),
            cpu: Number.parseFloat(value['%cpu']),
            memory: Number.parseFloat(value['%mem'])
        }));
};

module.exports = process.platform === 'win32' ? windows : unix;
