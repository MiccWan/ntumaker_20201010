const CONFIG = require('./config.json');
const path = require('path');
const { spawn } = require('child_process');
const { log, debug, error } = require('./logging')('python');

module.exports = {
  async runPython(fileName, ...args) {
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, '..', 'scripts', fileName);
      debug(`running '${fileName}'`);
      const [cmd, ...cmdArgs] = CONFIG.pythonCmd.split(' ')
	  debug(`running cmd ${cmd} ${[...cmdArgs, filePath, ...args].join(' ')}`)
      const process = spawn(cmd, [...cmdArgs, filePath, ...args]);

      process.on('exit', function () {
        debug('Done.');
        resolve();
      });

      process.on('error', function (err) {
        reject(err);
      });
    })
  }
};
