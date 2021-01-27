const fs = require('fs');
const glob = require('glob');
const ProgressBar = require('progress');
const chalk = require('chalk');
const log = console.log;
// const util = require('util');
// const EventEmitter = require('events').EventEmitter;
const Client = require('ssh2').Client;
const conn = new Client();
let count = 0;
// util.inherits(SftpConnection, EventEmitter);

function SftpConnection(remoteOpts = {}, callback) {

    this.remoteOpts = remoteOpts;
    conn.on('connect', function () {
        log(chalk.magenta('Begin Connect Server'));
    });
    conn.on('ready', () => {
        const {
            localPath,
            remotePath,
            localPathPrefix
        } = this.remoteOpts;
        const that = this;
        conn.sftp(function (err, sftp) {
            if (err) throw err;
            conn.exec('rm -rf ' + remotePath, function (err, stream) {
                if (err) throw err;
                stream.on('data', function (data) {
                    log(chalk.magenta('STDOUT: ' + data));
                });
                stream.stderr.on('data', function (data) {
                    log(chalk.magenta('STDERR: ' + data));
                });
                stream.on('close', function (code, signal) {
                    log(chalk.magenta('Shell Closed With Code ' + code));
                    sftp.mkdir(remotePath, function (err) {
                        if (err) throw err;
                        glob(localPath, {dot: true}, function (er, files) {
                            if (err) throw err;
                            bar = new ProgressBar(
                                `:bar Upload-Process => :percent Files-Total-Num => :current`,
                                { total: files.length, width: 50,}
                            );
                            files.forEach((item, index) => {
                                fs.stat(item, function (err, stats) {
                                    if (err) throw err;
                                    // let prefixPath = localPath.indexOf('*') > -1 ? localPath.substr(0, localPath.indexOf('*')) : localPath;
                                    // let suffixPath = item.split(`${prefixPath}`)[1];
                                    let suffixPath = item.split(localPathPrefix)[1];
                                    let remoteFile = remotePath + suffixPath;
                                    // console.log(remoteFile, 'newFileIdx')
                                    if (stats.isFile()) {
                                        sftp.fastPut(item, remoteFile, {}, function (err) {
                                            if (err) throw err;
                                            that.uploadEnd(files);
                                        })
                                    } else if (stats.isDirectory()) {
                                        sftp.mkdir(remoteFile, function (err) {
                                            if (err) throw err;
                                            that.uploadEnd(files);
                                        })
                                    } else {
                                        that.uploadEnd(files);
                                    }
                                })
                            })
                        })
                    })
                });
            });
        });
        log(chalk.magenta('Connect Server Success'));
    });
    conn.on('end', function () {
        log(chalk.magenta('End Server Success'));
    });
    conn.on('error', function (err) {
        log(chalk.red('err'));
    });
}

SftpConnection.prototype.upload = function (options = {}) {
    const { localPath, remotePath, localPathPrefix } = options;
    Object.assign(this.remoteOpts, {
        localPath,
        remotePath,
        localPathPrefix
    });
    console.log(this.remoteOpts)
    conn.connect(this.remoteOpts);
}

SftpConnection.prototype.uploadEnd = function (files) {
    ++count
    bar.tick(1);
    if (bar.complete) {
        log(chalk.green.italic('Files Upload Complete'))
    }
    if (count === files.length) {
        conn.end();
    }
}

module.exports = {
    SftpConnection
}