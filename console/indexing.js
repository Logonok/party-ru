'use strict';

// node console/indexing

const Application = require('../Application');
const Console = require('evado/console/Console');
const params = Console.parseProcessArguments();
const instance = new Console({Application, params});

(async () => {
    await instance.createIndexes();
    process.exit();
})();