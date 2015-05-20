var fs = require('fs'),
    mockFs = require('mock-fs'),
    should = require('should'),
    Config = require('../../../lib/config'),
    MakeDirectory = require('../../../lib/tasks/make-directory');

describe('MakeDirectory', function () {
    before(function () {
        var configFile = fs.readFileSync('./test/stub/.builder/make.js', { encoding: 'utf-8' });
        mockFs({
            '.builder': {
                'make.js': configFile
            }
        });
    });

    after(function () {
        mockFs.restore();
    });

    describe('instance methods', function () {
        var task;

        before(function () {
            task = new MakeDirectory(new Config('./test/stub/'), { path: './custom-dir' });
        });

        it('run', function (done) {
            task.run().then(function () {
                var exists = fs.existsSync('./custom-dir')
                exists.should.equal(true);
                done();
            });
        });
    });
});
