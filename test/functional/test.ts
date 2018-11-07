import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
const expect = chai.expect;

const should = chai.should(),
      before = mocha.before,
      after = mocha.after,
      it = mocha.it;

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

// Set up some arguments that would normally be passed on command line
process.argv.push('--exclude-https');
process.argv.push('-p');
process.argv.push('3000');

let app, server: any;

before(async () => {

    app = require("../../index");
    server = await app.httpServer;

    console.info('Server Listening:', server.listening);
});

after(async () => {

    await server.close(function() {});

    console.info('Server Listening:', server.listening);

});

describe('api/status', () => {

    it('should provide V8 information on api/status GET', (done) => {

            chai.request(server).get('/api/status').end((err, res) => {

                    if (err) console.error('Error:', err);

                    // console.log('res.body:', res.body);

                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    res.body.should.have.property('cachedDataVersionTag');
                    res.body.cachedDataVersionTag.should.be.a('number');

                    res.body.should.have.property('heapSpaceStatistics');
                    res.body.heapSpaceStatistics.should.be.a('array');

                    res.body.should.have.property('heapStatistics');
                    res.body.heapStatistics.should.be.a('object');
                    done();
            });
      });
});


describe('api/system', () => {

    it('should provide os info on api/system GET', (done) => {

        chai.request(server).get('/api/system').end((err, res) => {

                if (err) console.error('Error:', err);

                // console.log('res.body:', res.body);

                res.should.have.status(200);
                res.body.should.be.a('object');

                res.body.should.have.property('EOL');
                res.body.EOL.should.be.a('string');

                res.body.should.have.property('type');
                res.body.type.should.be.a('string');

                //res.body.should.have.property('release');
                //res.body.release.should.be.a('string');

                res.body.should.have.property('arch');
                res.body.arch.should.be.a('string');

                res.body.should.have.property('platform');
                res.body.platform.should.be.a('string');

                res.body.should.have.property('constants');
                res.body.constants.should.be.a('object');

                res.body.should.have.property('cpus');
                res.body.cpus.should.be.a('array');

                res.body.should.have.property('endianness');
                res.body.endianness.should.be.a('string');

                res.body.should.have.property('homedir');
                res.body.homedir.should.be.a('string');

                //res.body.should.have.property('userInfo');
                //res.body.userInfo.should.be.a('object');

                res.body.should.have.property('hostname');
                res.body.hostname.should.be.a('string');

                res.body.should.have.property('networkInterfaces');
                res.body.networkInterfaces.should.be.a('object');

                res.body.should.have.property('tmpdir');
                res.body.tmpdir.should.be.a('string');

                res.body.should.have.property('totalmem');
                res.body.totalmem.should.be.a('number');

                //res.body.should.have.property('freemem');
                //res.body.freemem.should.be.a('number');

                res.body.should.have.property('loadavg');
                res.body.loadavg.should.be.a('array');

                res.body.should.have.property('uptime');
                res.body.uptime.should.be.a('number');
                done();

            });
      });
});
