const os = require("os");

export class System {

    public EOL: any;
    public type: string;
    public release: string;
    public arch: string;
    public platform: string;
    public constants: string;
    public cpus: string;
    public endianness: string;
    public homedir: string;
    public userInfo: string;
    public hostname: string;
    public networkInterfaces: string;
    public tmpdir: string;
    public totalmem: string;
    public freeman: string;
    public loadavg: string;
    public uptime: string;

    constructor() {

        this.EOL = os.EOL || null;
        this.type = os.type() || null;
        this.release = os.release || null;
        this.arch = os.arch() || null;
        this.platform = os.platform() || null;
        this.constants = os.constants || null;
        this.cpus = os.cpus() || null;
        this.endianness = os.endianness() || null;
        this.homedir = os.homedir() || null;
        this.userInfo = null;
        this.hostname = os.hostname() || null;
        this.networkInterfaces = os.networkInterfaces() || null;
        this.tmpdir = os.tmpdir() || null;
        this.totalmem = os.totalmem() || null;
        this.freeman = os.freemem() || null;
        this.loadavg = os.loadavg() || null;
        this.uptime = os.uptime() || null;

    }

}
