## sftp-connection

![npm](https://img.shields.io/npm/v/sftp-connection)
![npm](https://img.shields.io/npm/dm/sftp-connection)
![NPM](https://img.shields.io/npm/l/sftp-connection)

## Installation

`npm i -D sftp-connection`

## Usage

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
