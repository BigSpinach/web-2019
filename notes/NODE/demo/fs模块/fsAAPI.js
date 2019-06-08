let fs = require('fs');
//console.dir(fs);

/*
  { constants: 
   { O_RDONLY: 0,
     O_WRONLY: 1,
     O_RDWR: 2,
     S_IFMT: 61440,
     S_IFREG: 32768,
     S_IFDIR: 16384,
     S_IFCHR: 8192,
     S_IFLNK: 40960,
     O_CREAT: 256,
     O_EXCL: 1024,
     O_TRUNC: 512,
     O_APPEND: 8,
     F_OK: 0,
     R_OK: 4,
     W_OK: 2,
     X_OK: 1,
     UV_FS_COPYFILE_EXCL: 1,
     COPYFILE_EXCL: 1 },
  Stats: [Function: Stats],
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
  access: [Function],
  accessSync: [Function],
  exists: [Function],
  existsSync: [Function],
  readFile: [Function],
  readFileSync: [Function],
  close: [Function],
  closeSync: [Function],
  open: [Function],
  openSync: [Function],
  read: [Function],
  readSync: [Function],
  write: [Function],
  writeSync: [Function],
  rename: [Function],
  renameSync: [Function],
  truncate: [Function],
  truncateSync: [Function],
  ftruncate: [Function],
  ftruncateSync: [Function],
  rmdir: [Function],
  rmdirSync: [Function],
  fdatasync: [Function],
  fdatasyncSync: [Function],
  fsync: [Function],
  fsyncSync: [Function],
  mkdir: [Function],
  mkdirSync: [Function],
  readdir: [Function],
  readdirSync: [Function],
  fstat: [Function],
  lstat: [Function],
  stat: [Function],
  fstatSync: [Function],
  lstatSync: [Function],
  statSync: [Function],
  readlink: [Function],
  readlinkSync: [Function],
  symlink: [Function],
  symlinkSync: [Function],
  link: [Function],
  linkSync: [Function],
  unlink: [Function],
  unlinkSync: [Function],
  fchmod: [Function],
  fchmodSync: [Function],
  chmod: [Function],
  chmodSync: [Function],
  fchown: [Function],
  fchownSync: [Function],
  chown: [Function],
  chownSync: [Function],
  _toUnixTimestamp: [Function: toUnixTimestamp],
  utimes: [Function],
  utimesSync: [Function],
  futimes: [Function],
  futimesSync: [Function],
  writeFile: [Function],
  writeFileSync: [Function],
  appendFile: [Function],
  appendFileSync: [Function],
  watch: [Function],
  watchFile: [Function],
  unwatchFile: [Function],
  realpathSync: [Function: realpathSync],
  realpath: [Function: realpath],
  mkdtemp: [Function],
  mkdtempSync: [Function],
  copyFile: [Function],
  copyFileSync: [Function],
  createReadStream: [Function],
  ReadStream: 
   { [Function: ReadStream]
     super_: 
      { [Function: Readable]
        ReadableState: [Function: ReadableState],
        super_: [Object],
        _fromList: [Function: fromList] } },
  FileReadStream: 
   { [Function: ReadStream]
     super_: 
      { [Function: Readable]
        ReadableState: [Function: ReadableState],
        super_: [Object],
        _fromList: [Function: fromList] } },
  createWriteStream: [Function],
  WriteStream: 
   { [Function: WriteStream]
     super_: { [Function: Writable] WritableState: [Function: WritableState], super_: [Object] } },
  FileWriteStream: 
   { [Function: WriteStream]
     super_: { [Function: Writable] WritableState: [Function: WritableState], super_: [Object] } } }

*/

//常用方法
//1. 创建 文件夹系列
let callback = function callback(err){
  if(err){
    console.log(err);
  }else{
    console.log('ok');
  }
};
fs.mkdir('./xxx000',callback);
