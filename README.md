## sftp-connection
---
<p>
  <a href="https://travis-ci.org/Atinux/node-ftps"><img src="https://travis-ci.org/Atinux/node-ftps.svg?branch=master" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/ftps"><img src="https://img.shields.io/npm/v/ftps.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/ftps"><img src="https://img.shields.io/npm/dt/ftps.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/ftps"><img src="https://img.shields.io/npm/l/ftps.svg" alt="License"></a>
  ![npm](https://img.shields.io/npm/v/sftp-connection)
  ![npm](https://img.shields.io/npm/dm/sftp-connection)
  ![NPM](https://img.shields.io/npm/l/sftp-connection)
</p>
## Installation
---
`npm i -D sftp-connection`

## Usage
---
1. upload files to remote server
```js
const sftp = new SftpConnection({
    host: '127.0.0.1',
    port: 22,
    username: 'root',
    password: 'password'
});

sftp.upload({
    localPath: '/root/project/',
    remotePath: '/usr/nginx/html/project/
});
```
