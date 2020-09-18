'use strict';

var Promise = require('bluebird');

var spawn = require('cross-spawn');

var debug_ = require('debug');

var debug = debug_('purs-loader');

module.exports = function compile(psModule) {
  var options = psModule.options;

  var zephyrCommand = 'zephyr';
  var zephyrArgs = [psModule.name, "-i", options.output, "-o", options.output];

  debug('zephyr %s %O', zephyrCommand, zephyrArgs);

  return new Promise(function (resolve, reject) {
    debug('Running zephyr...');

    var zephyr = spawn(zephyrCommand, zephyrArgs);

    zephyr.on('close', function (code) {
      debug('finished compiling zephyr.');
      if (code !== 0) {
        psModule.emitError("Zephyr failed");
        reject(new Error('Zephyr failed'));
      } else {
        resolve(psModule);
      }
    });
  });
};