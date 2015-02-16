#!/usr/bin/env node

var dep = require('./');
var argv = require('minimist')(process.argv.slice(2));
var JSONStream = require('JSONStream');
var reduce = require('stream-reduce');
var path = require('path');
var name = argv._[0] || local();

if (argv.help || argv.h) {
  return require('fs').createReadStream('./usage.txt').pipe(process.stdout);
}

if (argv.list || argv.l) {
  return dep(name)
    .on('error', function (message) {
      process.exit(+!console.error(message))
    })
    .pipe(JSONStream.parse('rows.*.key', function (tuple) { 
      return tuple[1] + ', '; 
    }))
    .pipe(process.stdout);
}

if (!argv.raw && !argv.r) {
  process.stdout.write(name + ' has ')
}

dep(name)
  .on('error', function (message) {
    process.exit(+!console.error(message))
  })
  .pipe(JSONStream.parse('rows.*.key'))
  .pipe(reduce(function (acc, row){
    return acc + 1;
  }, 0))
  .pipe(JSONStream.stringify('', '', ''))
  .on('end', function () {
    process.stdout.write(' modules depending on it\n')
  })
  .pipe(process.stdout);



function local() {
  var name;
  try {
      name = require(path.join(process.cwd(), './package.json')).name;
  } catch(e) {}
  return name;
}