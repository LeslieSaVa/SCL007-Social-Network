global.window = global;
global.assert= require('chai').assert;
require('../src/app.js');
require('./app.spec.js');