const SftpConnection = require('../lib/index');
const { readFileSync } = require('fs');
const sftp = new SftpConnection({
    host: 'xxx.xxx.xxx',
    port: 22,
    username: 'root',
    // password: 'password',
    privateKey: readFileSync('/xxxx/.ssh/id_rsa')
});

sftp.upload({
    localPath: '/xx/xxx/dist/**/*' || '',
    remotePath: '/xx/xxx/xxx/' || ''
});