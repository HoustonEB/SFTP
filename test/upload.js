const SftpConnection = require('../lib/index');

const sftp = new SftpConnection({
    host: '180.76.58.86',
    // port: 22,
    username: 'root',
    password: 'yu860852345@@'
});

sftp.upload({
    localPath: '/Users/v_yuzhuang01/Documents/Home/dist/**/*' || '',
    remotePath: '/usr/local/nginx/html/home/' || ''
});